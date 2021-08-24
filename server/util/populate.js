const fs = require('fs')
const { Client } = require('pg')
const { off } = require('process')

const word_list = fs.readFileSync('./corpus/sorted_word_list.txt').toString('utf-8')

// hard coded for this example
// we probably didn't need to do this but it felt more correct
const HEMINGWAY_CORPUS_ID = 1 

// usage from server folder: ./util/gen_list.sh && node util/populate.js

const populate = async () => {
  // create 2 arrays for unnest insert
  const words = word_list.split('\n')
  const corpus_ids = new Array(words.length).fill(HEMINGWAY_CORPUS_ID)

  const client = new Client({
    connectionString: process.env.DBURI,
    rejectUnauthorized: false,
    ssl: off,
  })

  await client.connect()
  try {
    const result = await client.query({
      text: `
      insert into search(word, corpus_id)
           select *
             from unnest($1::text[], $2::int[])
      on conflict
       do nothing`,
      values: [
        words,
        corpus_ids
      ],
    })
    console.log('populate done')
    process.exit(0)
  } catch (pg_err) {
    console.log(pg_err)
    process.exit(2)
  }
}

populate()