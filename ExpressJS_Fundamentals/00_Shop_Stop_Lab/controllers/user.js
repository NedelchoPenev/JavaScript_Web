const User = require('../models/User')
const encryption = require('../utilities/encryption')

module.exports.addUserGet = (req, res) => {
    res.render('user/register')
}

module.exports.addUserPost = (req, res) => {
    let user = req.body

    if (user.password && user.password !== user.confirmedPassword) {
        user.error = 'Password do not match.'
        return res.render('user/register', user)
    }

    let salt = encryption.generateSalt()
    user.salt = salt

    if (user.password) {
        let hashedPassword = encryption.generateHashedPassword(salt, user.password)
        user.password = hashedPassword
    }

    User.create(user).then((user) => {
        req.logIn(user, (err, user) => {
            if (err) {
                return res.render('user/register', {error: 'Authentication not working!'})
            }

            res.redirect('/')
        })
    }).catch(error => {
        user.error = error
        res.render('user/register', user) 
    })
}

module.exports.loginGet = (req, res) => {
    res.render('user/login')
}

module.exports.loginPost = (req, res) => {
    let userToLogin = req.body

    User.findOne({username: userToLogin.username}).then((user) => {
        if (!user || !user.authenticate(userToLogin.password)) {
            res.render('user/login', {error: 'Invalid credentials!'})
        } else {
            req.logIn(user, (error, user) => {
                if (error) {
                    return res.render('user/login', {error: 'Authentication not working!'})
                }

                res.redirect('/')
            })
        }
    })
}

module.exports.logout = (req, res) => {
    req.logout()
    res.redirect('/')
}