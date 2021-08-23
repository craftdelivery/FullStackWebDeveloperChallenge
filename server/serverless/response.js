const headers = require('./headers')
const http = require('http-status-codes').StatusCodes

// response helper
module.exports = function response(payload) {
    return {
      statusCode: http.OK,
      headers: headers,
      body: JSON.stringify({ ...payload }),
    }
  }