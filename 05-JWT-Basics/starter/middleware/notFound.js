const notFoundMiddleware = (req,res) =>{
    res.status(404).send('soory! can not found what you looking for');;
}

module.exports = notFoundMiddleware