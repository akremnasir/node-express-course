class CustomAPIErrror extends Error {
    constructor (message, statusCode) {
        super(message)
    }
}

module.exports = CustomAPIErrror