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

let defaultResponse = (respString, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    res.end(respString)
}

let fieldChecker = obj => {
    for (let prop in obj) {
        if (obj[prop] === '') {
            return true
        }
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

        let responseString = ''
        for (let meme of data) {
            responseString += `<div class="meme">
    <a href="/getDetails?id=${meme.id}">
    <img class="memePoster" src="${meme.memeSrc}"/>          
    </div>`
        }

        fs.readFile('./views/viewAll.html', (err, html) => {
            if (err) {
                console.log(err)
                return
            }
            html = html
                .toString()
                .replace('<div id="replaceMe">{{replaceMe}}</div>', responseString)

            defaultResponse(html, res)
        })
    })
}

let viewAddMeme = (req, res, status = null) => {
    fs.readFile('./views/addMeme.html', (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        Genre.find().then((genres) => {
            let exitString = ''

            console.log(exitString)

            for (let genre of genres) {
                exitString += `<option value="${genre.title}">${genre.title}</option>`
            }

            if (status === 'err') {
                data = data
                    .toString()
                    .replace(
                        '<div id="replaceMe">{{replaceMe}}</div>',
                        '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>'
                    )
            }
            if (status === 'suc') {
                data = data
                    .toString()
                    .replace(
                        '<div id="replaceMe">{{replaceMe}}</div>',
                        '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>'
                    )
            }
            defaultResponse(
                data
                    .toString()
                    .replace('<div id="replaceMe">{{replaceMe2}}</div>', exitString),
                res
            )
        })
    })
}

let getDetails = (req, res) => {
    let targetId = qs.parse(url.parse(req.url).query).id

    Meme.findById(targetId).then((targetedMeme) => {
        let replaceString = `<div class="content">
    <img src="${targetedMeme.memeSrc}" alt=""/>
    <h3>${targetedMeme.title}</h3>
    <p> ${targetedMeme.description}</p>
    <button><a href="${targetedMeme.memeSrc}" download="${targetedMeme.title}.jpg" >Download Meme</a></button>
    </div>`

        fs.readFile('./views/details.html', (err, data) => {
            if (err) {
                console.log(err)
                return
            }
            data = data
                .toString()
                .replace('<div id="replaceMe">{{replaceMe}}</div>', replaceString)
            defaultResponse(data, res)
        })
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
                            viewAddMeme(req, res, 'err')
                            return
                        }

                        if (fieldChecker(fields)) {
                            viewAddMeme(req, res, 'err')
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
                                    viewAddMeme(req, res, 'suc')
                                })
                                .catch(() => {
                                    viewAddMeme(req, res, 'err')
                                })
                        }
                    })
                }
                else {
                    viewAddMeme(req, res, 'err')
                }
            })
        })
}

let getSearchMeme = (req, res) => {
    fs.readFile('./views/searchMeme.html', (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        
        Genre.find().then((genres) => {
            let exitString = '<option value="all">all</option>'

            for (let genre of genres) {
                exitString += `<option value="${genre.title}">${genre.title}</option>`
            }

            data = data
                .toString()
                .replace('<div id="replaceMe">{{replaceMe}}</div>', exitString)
            defaultResponse(data, res)
        })
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
            
                let responseString = ''
                for (let meme of sorted) {
                    responseString += `<div class="meme">
                      <a href="/getDetails?id=${meme.id}">
                      <img class="memePoster" src="${meme.memeSrc}"/>          
                      </div>`
                }
            
                fs.readFile('./views/viewAll.html', (err, html) => {
                    if (err) {
                        console.log(err)
                        return
                    }
                    html = html
                        .toString()
                        .replace('<div id="replaceMe">{{replaceMe}}</div>', responseString)
            
                    defaultResponse(html, res)
                })
            })
        })
    })
}

let createGenreView = (req, res, status = null) => {
    fs.readFile('./views/addGenre.html', (err, data) => {
        if (err) {
            console.log(err)
        }

        if (status === 'err') {
            data = data
                .toString()
                .replace(
                    '<div id="replaceMe">{{replaceMe}}</div>',
                    '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>'
                )
        }
        
        if (status === 'suc') {
            data = data
                .toString()
                .replace(
                    '<div id="replaceMe">{{replaceMe}}</div>',
                    '<div id="succssesBox"><h2 id="succssesMsg">Genre Added</h2></div>'
                )
        }
        defaultResponse(data, res)
    })
}

let createGenrePost = (req, res) => {
    let fields = req.body

    let genre = {
        title: fields.memeTitle,
        memeArr: []
    }

    Genre.create(genre).then(() => {
        createGenreView(req, res, 'suc')
    }).catch(() =>{
        createGenreView(req, res, 'err')
    })
}

module.exports = { 
    addMeme, 
    viewAddMeme, 
    viewAll, 
    getDetails, 
    getSearchMeme, 
    searchForMeme,
    createGenreView,
    createGenrePost 
}
