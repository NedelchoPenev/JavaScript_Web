const mongoose = require('mongoose')

let categoryScheme = mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, required: true, unique: true },
    creator: {type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true},
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
})

let Category = mongoose.model('Category', categoryScheme)

module.exports = Category