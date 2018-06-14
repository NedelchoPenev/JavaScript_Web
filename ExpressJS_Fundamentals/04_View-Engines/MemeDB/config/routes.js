const handlers = require('../handlers')
const multer = require('multer')

let upload = multer({dest: './public/memeStorage'})

module.exports = (app) => {
    app.get('/', handlers.home.index)

    app.get('/viewAllMemes', handlers.meme.viewAll)

    app.get('/addMeme', handlers.meme.viewAddMeme)
    app.post('/addMeme', upload.single('meme'), handlers.meme.addMeme)

    app.get('/getDetails', handlers.meme.getDetails)

    app.get('/searchMeme', handlers.meme.getSearchMeme)
    app.post('/searchMemePost', upload.array(), handlers.meme.searchForMeme)
    
    app.get('/addGenre', handlers.genre.createGenreView)
    app.post('/aaddGenre', upload.array(), handlers.genre.createGenrePost)
}