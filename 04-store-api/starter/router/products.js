const express = require('express')
const {getAllProductStatic, getAllProducts} = require('../controller/products')

const router = express.Router()

// use patch insted of put if the update is partial
router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductStatic)

module.exports = router