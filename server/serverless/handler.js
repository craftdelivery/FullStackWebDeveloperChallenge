const response = require('./response')
const err_response = require('./err_response')
const pg = require('pg')
const http = require('http-status-codes').StatusCodes

const { DBURI } = process.env

// required to connect to the db
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

let db
if (!db) {
  db = new pg.Client({
    connectionString: DBURI,
    poolSize: 25,
    ssl: true,
    max: 100,
    maxConnections: 200,
  })
  db.connect()
}

// Timeout needed on a cold start
const WARM_UP = 2000

const SEARCH_LIMIT = 3
const CORPUS_ID = 1
const PG_CONFLICT_CODE = '23505'


module.exports.remove = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const { word } = event.pathParameters
  if (!word || !word.length) {
    return err_response('No Word Provided', http.EXPECTATION_FAILED)
  }
  const word_trimmed = word.trim()

  if (!db._connected || db._connecting) {
    setTimeout(() => console.log('Warming UP the Lambda...'), WARM_UP)
  }
  try {
    const resp = await db.query({
      name: 'search-remove',
      text: `
          delete from search
            where word=(
              select word from (
                select word, 
                       similarity(word, $1) as sml
                  from search
                 where corpus_id=${CORPUS_ID}
                   and word % $1
              order by sml DESC, word
                 limit 1) sq
            )
          returning *`,
      values: [ word_trimmed ]
    })
    return response({result: resp.rows})
  } catch (e) {
    return err_response(e.message || 'Error')
  }
}

module.exports.search = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const { query } = event.pathParameters

  if (!db._connected || db._connecting) {
    setTimeout(() => console.log('Warming UP the Lambda...'), WARM_UP)
  }

  try {
    const resp = await db.query({
      name: 'search-query',
      text: `
          select word,
                 similarity(word, $1) as sml
            from search
           where word % $1
             and corpus_id=${CORPUS_ID}
        order by sml DESC, word
           limit ${SEARCH_LIMIT}`,
      values: [ query ]
    })
    return response({result: resp.rows})
  } catch (e) {
    return err_response(e.message || 'Error')
  }
}


module.exports.update = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const { word } = event.pathParameters
  if (!word || !word.length) {
    return err_response('No Word Provided', http.EXPECTATION_FAILED)
  }
  const word_trimmed = word.trim()

  if (!db._connected || db._connecting) {
    setTimeout(() => console.log('Warming UP the Lambda...'), WARM_UP)
  }
  try {
    const resp = await db.query({
      name: 'search-update',
      text: `
        insert into search(word, corpus_id)
             values ($1, ${CORPUS_ID})
          returning *`,
      values: [ word_trimmed ]
    })
    return response({result: resp.rows})
  } catch (e) {
    if (e.code === PG_CONFLICT_CODE) {
      return err_response('Word Exists', http.CONFLICT)
    }
    return err_response(`${e.message || 'Error'}: ${e.code || 'No PG Error Code'}`)
  }
}