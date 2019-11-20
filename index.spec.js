const assert = require('assert')
const should = require('should')
const request = require('supertest')
const app = require('./app2')

describe('GET /users',() => {
 it('배열을 반환한다.',(done) => {
   //assert.equal(1.1)
   //(1).should.equal(1)
   request(app)
      .get('/users')
      .end((err,res) => {
         if(err) throw err
         res.body.should.be.instanceof(Array)
      
         res.body.forEach(user => {
            user.should.have.property('name')
         });
         done()
      })
   })
   it('최대limit 갯수만큼 응답한다', done => {
      request(app)
      .get('/users?limit=2')
      .end((err,res) => {
         if(err) throw err
         
          res.body.should.have.lengthOf(2)
        done()
      })
   })
})