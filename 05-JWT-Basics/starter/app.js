const connectDB = require('./db/connect')

const express = require('express')
const app = express()
require('dotenv').config()

//adding our async error module
require('express-async-errors')

//adding middlewares
const notFoundMiddleware = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/error-handler')

//adding our routers
const mainRouter = require('./router/main')

app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1', mainRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3000
const start = async () => {
  try {
    //await connectDB(process.env.MONGO_URI)
    app.listen(PORT,() => console.log(`server listening on port ${PORT}....`))
  } catch (error) {
    console.log(error)
  }
}
start()




