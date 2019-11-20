const express = require('express')
//logger 미들웨어 
const logger = require('morgan')
//app 어플리케이션 생성
const app = express()

const mw = (req, res, next) => {
    // throw Error('error!')
    next()
}

const errorMw = (err, req, res, next) => {console.log(err.message)}

app.use(logger('dev'))
app.use(mw)
app.use(errorMw)

app.listen(3000, () => console.log('running'))