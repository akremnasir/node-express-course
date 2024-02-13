const customAPIError = require('./custom-err')
const {StatusCodes} = require('http-status-codes')
class BadRequest extends customAPIError {
    constructor (message) {
        super(message)
        this.statusCode = 400
    }
}

module.exports = BadRequest