const mongoose = require('mongoose')

let ImageSchema = new mongoose.Schema({
    url: {type: mongoose.SchemaTypes.String, required: true},
    creationDate: {type: mongoose.SchemaTypes.Date, default: Date.now},
    title: {type: mongoose.SchemaTypes.String },
    description: {type: mongoose.SchemaTypes.String},
    tags: []
})

module.exports = mongoose.model('Image', ImageSchema)