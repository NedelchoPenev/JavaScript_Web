const formidable = require('formidable');
const baseHandler = require('./baseHandler');
const fs = require('fs');

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res)
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res)
  } else {
    return true
  }
}

function addImage(req, res) {
  let form = new formidable.IncomingForm()

  form.parse(req, function (err, fields, files) {
    fs.readFile(__dirname + '/../views/index.html', (err, data) => {
      if (err) {
        console.log(err)
        return
      }

      
    })
  })
}
