const mongoose = require('mongoose')

let categoryScheme = mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, required: true, unique: true },
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
})

let Category = mongoose.model('Category', categoryScheme)

module.exports = Category