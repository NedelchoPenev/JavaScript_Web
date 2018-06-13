const Product = require('../models/Product')
const Category = require('../models/Category')

module.exports.addGet = (req, res) => {
    Category.find().then((categories) => {
        res.render('product/add', {categories: categories})
    })
}

module.exports.addPost = (req, res) => {
    let productObj = req.body
    productObj.image = '\\' + req.file.path
    Product.create(productObj).then((product) => {
        Category.findById(product.category).then((category) => {
            category.products.push(product._id)
            category.save()
        })

        res.redirect('/')
    })
}

module.exports.editGet = (req, res) => {
    let id = req.params.id
    Product.findById(id).then((product) => {
        if (!product) {
            res.sendStatus(404)
            return
        }

        Category.find().then((categories) => {
            res.render('product/edit', {
                product: product,
                categories: categories
            })
        })
    })
}