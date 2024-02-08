const connectDB = require('./db/connect')
require('express-async-errors')
const express = require('express')

const process= require('process');
process.removeAllListeners('warning');

const app = express()
require('dotenv').config()
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/error-handler')

const productsRouter = require('./router/products')

//middleware
app.use(express.json())
app.use('/api/v1/products',productsRouter)
app.use(notFound)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3000
const start = async () =>{
    try {
       await connectDB(process.env.MONGO_URI)
       app.listen(port,()=>{
        console.log(`listening on port ${port}...`)
       })
    } catch (error) {
        console.log(error)   
    }
}
start()

