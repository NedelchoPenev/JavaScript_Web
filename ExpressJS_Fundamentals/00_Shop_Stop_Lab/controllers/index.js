const homeHandler = require("./home")
const productHandler = require('./product')
const categoryHandler = require('./category')
const userController = require('./user')

module.exports = { 
    home: homeHandler, 
    product: productHandler, 
    category: categoryHandler,
    user: userController
}