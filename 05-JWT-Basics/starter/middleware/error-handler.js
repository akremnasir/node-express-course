 const {customAPIError} = require('../error')
 const {statusCode} = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) =>{
    if( err instanceof customAPIError){
        return res.status(err.statusCode).json({msg: err.message})
    }
    console.log(err)
    res.status(statusCode.INTERNAL_SERVER_ERROR).send('sorry! something went wrong');
}

module.exports = errorHandlerMiddleware