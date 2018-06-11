const mongoose = require('mongoose')

let genreSchema = mongoose.Schema({
    title: {type: mongoose.SchemaTypes.String, required: true},
    memeArr: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Meme'}]
})

let Genre = mongoose.model('Genre', genreSchema)

module.exports = Genre