const mongoose = require('mongoose')

let memeSchema = mongoose.Schema({
    title: { type: mongoose.SchemaTypes.String, required: true },
    memeSrc: { type: mongoose.SchemaTypes.String },
    description: { type: mongoose.SchemaTypes.String },
    privacy: { type: mongoose.SchemaTypes.String },
    dateOfCreation: { type: mongoose.SchemaTypes.Date, default: Date.now },
    genreId: { type: mongoose.SchemaTypes.String }
})

let Meme = mongoose.model('Meme', memeSchema)

module.exports = Meme