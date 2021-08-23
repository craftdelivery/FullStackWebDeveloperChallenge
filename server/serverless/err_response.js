const headers = require('./headers')
const http = require('http-status-codes').StatusCodes

// error response helper
module.exports = function errResponse(msg, status=http.BAD_REQUEST) {
  return {
    statusCode: status,
    headers: headers,
    body: JSON.stringify({ error: msg }),
  }
}