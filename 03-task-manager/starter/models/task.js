const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'must provide name'],
        trim:true,
        maxlength:[20,'name can not be more rhan 20 caracters']
    },
    completed:{
        type:Boolean,
        default:false
    }
})
//validations

module.exports = mongoose.model('Task', taskSchema)