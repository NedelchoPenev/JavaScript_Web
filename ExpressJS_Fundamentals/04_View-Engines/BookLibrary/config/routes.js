const handlers = require('../handlers/handlerBlender')
// const multer = require('multer')

// let upload = multer({dest: './static/images'})

module.exports = (app) => {
    app.get('/', handlers.home.index)

    app.get('/addBook', handlers.book.addBookGet)
    app.post('/addBook', handlers.book.addBookPost)

    app.get('/viewAllBooks', handlers.book.viewAllBooks)

    app.get('/books/details/:id', handlers.book.details)
}