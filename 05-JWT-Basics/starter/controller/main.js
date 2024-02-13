
const getItem = (req,res) =>{

    //throw new Error('testing async errors')
    //res.status(200).send('jwt basics');
}
const { json } = require('express')
const {BadRequestError} = require('../error')

const jwt = require('jsonwebtoken')
const login = async (req,res)=>{

    const {username, password} = req.body 

    if(!username || !password){
        throw new BadRequestError('plese provide email and password')
    }

    const id = new Date().getDate()

    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'})

   
    res.status(200).json({msg:'user created', token})

}
const dashboard = async (req,res) =>{
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({msg:`hello, ${req.user.username}`, secret:`here is your authorized data, your lucky number is ${luckyNumber}`})
}

module.exports = {login, dashboard}