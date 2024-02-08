const express = require('express')

const app = express()
const port = 5000
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.static('./public'))
//app.use(express.urlencoded)

//routes

app.use('/api/v1/products', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen( port, ()=>{
            console.log(`server listening on port ${port}...`)
        })
    }catch (error) {
        console.log(error)
    }
}

start()




