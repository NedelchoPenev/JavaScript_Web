const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const helpers = require('handlebars-helpers')()

module.exports = (app, config) => {
    app.use(bodyParser.urlencoded({extended: true}))

    app.engine('.hbs', handlebars({
        extname: '.hbs',
        defaultLayout: 'main'
    }))
    app.set('view engine', '.hbs')

    app.use(
        (req, res, next) => {
        if (req.url.startsWith('/static')) {
            req.url = req.url.replace('/static', '')
        }

        next()
    }, 
    express.static(
        path.normalize(
            path.join(config.rootPath, '/static')
        )
    ))
}