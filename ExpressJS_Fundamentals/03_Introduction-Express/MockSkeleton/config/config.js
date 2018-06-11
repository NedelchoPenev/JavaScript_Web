const path = require('path')

module.exports = {
    development: {
        connectionString: 'mongodb://localhost:27017/MemeDB',
        rootPath: path.normalize(path.join(__dirname, '../'))
    },
    production: {
    }
}