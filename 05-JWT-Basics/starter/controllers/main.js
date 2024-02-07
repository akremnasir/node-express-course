const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const login = async (req,res)=>{
    const{username,password} = req.body
    if(!username || !password){
        throw new CustomAPIError('please provide email and password',400)
    }

    const id = new Date().getDate()
    

    const token = jwt.sign({id, username},process.env.JWT_SECRET,{expireIn:'30d'})
    console.log(username,password)
    res.status(200).json({msg:'user created',token})
}
const dashboard = async (req,res) =>{
    const luckeyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`hello, john Doe`, secret:`here is your authorized data, your lucky number is ${luckeyNumber}`})
}

module.exports = {
    login,dashboard
}