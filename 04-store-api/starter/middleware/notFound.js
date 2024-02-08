const notFound = (req,res,next)=>{
    res.status(500).send('route dose not exist');
}

module.exports = notFound