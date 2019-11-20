const express = require('express')
const logger = require('morgan')

const users = [
    { id: 1, name: 'Alice'},
    { id: 2, name: 'Blice'},
    { id: 3, name: 'Clice'}
]

const app = express()

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/users/', (req, res) => {
    req.query.limit = req.query.limit || 10
    const limit = parseInt(req.query.limit,10)
    res.json(users.slice(0, limit))
})

module.exports = app