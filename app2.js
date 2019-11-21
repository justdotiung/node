const express = require('express')
const logger = require('morgan')
const app = express()
const user = require('./api/user')

app.use(logger('dev'))
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.use('/users',user)

module.exports = app