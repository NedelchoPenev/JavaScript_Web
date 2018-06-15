let Book = require('../models/Book')

module.exports.index = (req, res) => {
    Book.count().then((booksCount) => {
        let passedVariable = req.query.successMsg
        res.render('index', {booksCount, successMsg: passedVariable})
    })
}