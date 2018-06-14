const mongoose = require('mongoose')

let bookSchema = mongoose.Schema({
    bookTitle: { type: mongoose.SchemaTypes.String, required: true },
    bookPoster: { type: mongoose.SchemaTypes.String },
    bookYear: { type: mongoose.SchemaTypes.Number, min: 1900, max: 2018 },
    bookAuthor: { type: mongoose.SchemaTypes.String }
})

let Book = mongoose.model('Book', bookSchema)

module.exports = Book