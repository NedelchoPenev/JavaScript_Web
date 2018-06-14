const fs = require('fs')
const url = require('url')
const path = require('path')
const qs = require('querystring')
const shortid = require('shortid')

const Meme = require('../models/Meme')
const Genre = require('../models/Genre')

// Utils

let memeGenerator = (title, memeSrc, description, privacy, genreSelect) => {
    return {
        title: title,
        memeSrc: memeSrc,
        description: description,
        privacy: privacy,
        dateStamp: Date.now(),
        genreId: genreSelect
    }
}

let viewAll = (req, res) => {
    Meme.find({}).then((data) => {
        data = data
            .sort((a, b) => {
                return b.dateStamp - a.dateStamp
            })
            .filter(meme => {
                return meme.privacy === 'on'
            })

        res.render('meme/viewAll', {meme: data})
    })
}

let viewAddMeme = (req, res) => {
        Genre.find().then((genres) => {
            res.render('meme/addMeme', {genre: genres})
    })
}

let addMeme = (req, res) => {
    let fileName = shortid.generate() + '.jpg';
    let fields = req.body
    let files = req.file

    Meme.find()
        .then(allMemes => {
            let dirName = `/public/memeStorage/${Math.ceil(allMemes.length / 10)}`
            let relativeFilePath = dirName + '/' + fileName
            let absoluteDirPath = path.join(__dirname, `../${dirName}`)
            let absoluteFilePath = absoluteDirPath + '/' + fileName;

            fs.access(absoluteDirPath, err => {
                if (err) {
                    fs.mkdirSync(absoluteDirPath)
                }

                if (files) {
                    fs.rename(files.path, absoluteFilePath, (err) => {
                        if (err) {
                            console.log(err)
                            return
                        } else {
                            let memeForImport = memeGenerator(
                                fields.memeTitle,
                                relativeFilePath,
                                fields.memeDescription,
                                fields.status,
                                fields.genreSelect
                            )

                            Meme.create(memeForImport)
                                .then((meme) => {
                                    Genre.findOne({title: memeForImport.genreId})
                                        .exec((err, genre) => {
                                            genre.memeArr.push(meme.id)
                                            meme.genreId = genre.id
                                            meme.save()
                                            genre.save()
                                        })
                                        res.redirect('/viewAllMemes')
                                })
                        }
                    })
                }
            })
        })
}

let getDetails = (req, res) => {
    let targetId = qs.parse(url.parse(req.url).query).id

    Meme.findById(targetId).then((meme) => {
        res.render('meme/details', {meme})
    })
}

let getSearchMeme = (req, res) => {
    Genre.find().then((genres) => {
        res.render('meme/searchMeme', {genres})
    })
}

let searchForMeme = (req, res) => {
    Meme.find().then((memes) => {
        Genre.find().then((genres) => {
            let params = req.body
            let title = params.memeTitle
            let selectedGenre = params.genreSelect
        
            let sortedId = []
        
            if (selectedGenre !== 'all') {
                for (let genre of genres) {
                    if (genre.title === selectedGenre){
                        for (let meme of genre.memeArr) {
                            sortedId.push(meme)
                        }
                    }
                }
            } else {
                sortedId = memes
            }
        
            Meme.find({'_id': { $in: sortedId }}).then((sorted) => {
                if (title !== '') {
                    sorted = sorted.filter(elem => {
                        if (elem.title.indexOf(title) !== -1) {
                            return elem
                        }
                    })
                }
                sorted = sorted
                    .sort((a, b) => {
                        return b.dateStamp - a.dateStamp
                    })
                    .filter(meme => {
                        return meme.privacy === 'on'
                    })
            
                res.render('meme/viewAll', {meme: sorted})
            })
        })
    })
}

module.exports = { 
    addMeme, 
    viewAddMeme, 
    viewAll, 
    getDetails, 
    getSearchMeme, 
    searchForMeme
}
