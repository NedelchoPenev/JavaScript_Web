let Book = require('../models/Book')

module.exports.addBookGet = (req, res) => {
    res.render('addBook')
}

module.exports.addBookPost = (req, res) => {
    let book = req.body

    if (!book.bookTitle || !book.bookPoster) {
        res.locals.errMsg = 'Please fill all fields!';
        return res.render('addBook', book)
    }

    Book.create(book).then(() => {
        let successMsg = encodeURIComponent('Book Added.')
        res.redirect('/?successMsg=' + successMsg)
    })
}

module.exports.viewAllBooks = (req, res) => {
    Book.find().then((books) => {
        books.sort((a, b) => b.bookYear - a.bookYear)
        res.render('viewAll', {books})
    })
}

module.exports.details = (req, res) => {
    let id = req.params.id
    Book.findById(id).then((book) => {
        res.render('details', {book})
    })
}