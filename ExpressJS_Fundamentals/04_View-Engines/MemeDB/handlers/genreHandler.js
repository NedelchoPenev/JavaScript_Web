const Genre = require('../models/Genre')

let createGenreView = (req, res, status = 'err') => {
    res.render('genre/addGenre', {status})
}

let createGenrePost = (req, res) => {
    let fields = req.body

    let genre = {
        title: fields.memeTitle,
        memeArr: []
    }

    Genre.create(genre).then(() => {
        createGenreView(req, res)
    })
}

module.exports = { createGenreView, createGenrePost }