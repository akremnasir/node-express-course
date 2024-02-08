//throw new Error('testing async error')
const Product = require('../models/product')
const { search } = require('../router/products')
// methods for mainSchema
//  const getall = await mainschema.find()
//   const create = await mainschema.create()
//   const update = await mainschema.findOneAndUpdate()

const getAllProductStatic =async (req,res,next) =>{
    const products = await Product.find({featured:true})
    res.status(200).json({products, nbHits: products.length})
}
const getAllProducts=async (req,res,next) =>{

    const { featured, company, name, sort, fields, numericFilters } = req.query
    const queryObject = {}

    if (featured){
        queryObject.featured = featured === 'true' ? true : false
    }

    if (company){
        queryObject.company = company
    }
    if (name){
        queryObject.name = {$regex: name, $options: 'i'}
    }
    if(numericFilters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx,(match) => `-${operatorMap[match]}-`
        )
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field,operator,value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }      
        });
    }


    let result = Product.find(queryObject)
    //sort
    if(sort){
       const sortList = sort.split(',').join(' ');
       result = result.sort(sortList)
     
    }
    else{
        result = result.sort('createdAt')
    }
    //select
    if(fields){
        const fieldsList = fields.split(',').join(' ');
       result = result.select(fieldsList)
    }
    
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1) * limit

    result = result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({products, nbHits: products.length})
}

module.exports = {getAllProductStatic, getAllProducts}