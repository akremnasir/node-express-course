
const product = require('../models/product')

const getAllProductsStatic = async (req,res) =>{
    const staticProducts = await product.find({featured: true}) 
    res.status(200).json({staticProducts, nbHits: staticProducts.length})
}
const getAllProducts = async (req,res) =>{
    const {featured,company,name,sort,fields,numericFilters} = req.query
    const queryObject = {}
    if(featured){
        queryObject.featured = featured ==='true'?true:false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex: name, $options: 'i'}
    }
// give attention for this.......................
    if(numericFilters){
        const operatorMap = {
            '>':'$gt',
            '<':'$lt',
            '>=':'$gte',
            '<=':'$lte',
            '=':'$eq',
        }
        const regEx = /\b(<|>|>=|<=|=)\b/g
        let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
        

        const options = ['price','rating']
        filters = filters.split(',').forEach((item) => {
           const [field,operator,value] = item.split('-') 
           if(options.includes(field)){
            queryObject[field] = {[operator]:Number(value)}
           }
        });
    }



    let result = product.find(queryObject) 
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createAt')
    }
    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1) *limit;
    result = result.skip(skip).limit(limit)



    const allProducts = await result
    res.status(200).json({allProducts, nbHits: allProducts.length})
}

module.exports ={
    getAllProducts, getAllProductsStatic,
}