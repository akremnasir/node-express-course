const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{  //validations
    type:String,
    required:[true,'product name must be provided'],
    trim:true,
    maxlength:[20,'name can not be more rhan 20 caracters']
    },
    price:{
        type:Number,
        required:[true,'product price must be provided']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['ikea','liddy','caressa', 'marcos'],
            message: '{value} is not supported'
        } 
    }  
})
module.exports = mongoose.model('Product', productSchema)