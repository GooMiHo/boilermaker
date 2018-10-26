const path = require('path')
const express = require('express')
const app = express()

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
})
