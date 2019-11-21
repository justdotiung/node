const assert = require('assert')
const should = require('should')
const request = require('supertest')
const app = require('../../app2')

describe('GET /users',() => {
   describe('성공', () => {
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
   describe('실패', () => {
      it('Limit이 정수가 아니면 400을 응답한다', done => {
         request(app)
            .get('/users?limit=two')
            .expect(400)//400 에러를 기대
            .end(done);
      })
   })


})
describe('GET /users/:id',() => {
   describe('성공', () => {
      it('유저 객체를 반환한다', done => {
         request(app)
            .get('/users/1')
            .end((err,res) => {
               res.body.should.have.property('id',1)
               done()
            })
      })
   })
   describe('실패', () => {
      it('id가 숫자가 아닐경우 400을 응답한다', done => {
         request(app)
            .get('/users/one')
            .expect(400)
            .end(done)
      })
      it('찾을수 없는 id일 경우 404 응답', done => {
         request(app)
            .get('/users/9')
            .expect(404)
            .end(done)
      })
   })

})
describe('DELETE /users/:id',() => {
   describe('성공', () => {
      it('204 응답', done => {
         request(app)
         .delete('/users/3')
         .expect(204)
         .end(done)
      })
   })
   describe('실패', () => {
      it('400 응답', done => {
         request(app)
         .delete('/users/one')
         .expect(400)
         .end(done)
      })
   })
})
describe('POST /users',() => {
   describe('성공',() => {
      it('201을 응답', done => {
         request(app)
            .post('/users')
            .send({ name : 'Daniel'})
            .expect(201)
            .end((err,res) => {
               res.body.should.have.property('name','Daniel')
               done()
            })
      })      
      it('생성한 유저객체를 반환', done => {
         request(app)
         .post('/users')
         .send({ name : 'Danieal'})
         .expect(201)
         .end((err,res) => {
            res.body.should.have.property('name','Danieal')
            done()
         })
      })
   })
   describe('실패',() => {
      it('name이 없으면 400응답', done => {
         request(app)
            .post('/users')
            .send({})
            .expect(400)
            .end(done)
      })
      it('name이 중복이면 409응답', done => {
         request(app)
            .post('/users')
            .send({ name : 'Daniel'})
            .expect(409)
            .end(done)
      })
   })
})