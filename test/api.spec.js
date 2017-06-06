/* eslint-env mocha */

process.env.NODE_ENV = 'test'
const chaiHttp = require('chai-http')
const server = require('../server/index')
const chai = require('chai')
const should = chai.should()
const expect = chai.expect
const configuration = require('../knexfile')['test']
const database = require('knex')(configuration)

chai.use(chaiHttp)

describe('/api/v1', () => {
  before(done => {
    database.migrate
      .latest()
      .then(() => {
        return database.seed.run()
      })
      .then(() => {
        done()
      })
  })

  beforeEach(done => {
    database.seed.run().then(() => {
      done()
    })
  })

  describe('GET /api/v1/items', () => {
    it('should respond with all items', done => {
      chai.request(server).get('/api/v1/items').end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.an('object')
        res.body.data.should.be.an('array')
        res.body.data[0].should.have.property('id').that.is.a('string')
        res.body.data[0].should.have
          .property('type')
          .that.is.a('string')
          .that.equals('items')
        res.body.data[0].attributes.should.have
          .property('name')
          .that.is.a('string')
        res.body.data[0].attributes.should.have
          .property('reason')
          .that.is.a('string')
        res.body.data[0].attributes.should.have
          .property('cleanliness')
          .that.is.a('string')
        done()
      })
    })
  })

  describe('GET /api/v1/items/:id', () => {
    it('should return specific item', done => {
      chai.request(server).get('/api/v1/items/1').end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.an('object')
        res.body.data.should.be.an('array')
        res.body.data.should.have.lengthOf(1)
        res.body.data[0].should.have.property('id').that.is.a('string')
        res.body.data[0].should.have
          .property('type')
          .that.is.a('string')
          .that.equals('items')
        res.body.data[0].attributes.should.have
          .property('name')
          .that.is.a('string')
        res.body.data[0].attributes.should.have
          .property('reason')
          .that.is.a('string')
        res.body.data[0].attributes.should.have
          .property('cleanliness')
          .that.is.a('string')
        done()
      })
    })

    it('should return 404 if item is not found', done => {
      chai.request(server).get('/api/v1/items/999999').end((err, res) => {
        res.should.have.status(404)
        done()
      })
    })
  })

  describe('POST /api/v1/items', () => {
    it('should return the posted item', done => {
      chai
        .request(server)
        .post('/api/v1/items')
        .send({
          name: 'Test',
          reason: 'We be testing',
          cleanliness: 'Sparkling',
        })
        .end((err, res) => {
          res.should.have.status(201)
          res.should.be.json
          res.body.should.be.an('object')
          res.body.data.should.be.an('array')
          res.body.data.should.have.lengthOf(1)
          res.body.data[0].should.have.property('id').that.is.a('string')
          res.body.data[0].should.have
            .property('type')
            .that.is.a('string')
            .that.equals('items')
          res.body.data[0].attributes.should.have
            .property('name')
            .that.is.a('string')
          res.body.data[0].attributes.should.have
            .property('reason')
            .that.is.a('string')
          res.body.data[0].attributes.should.have
            .property('cleanliness')
            .that.is.a('string')
          done()
        })
    })

    it('should return 400 if missing a parameter', done => {
      chai
        .request(server)
        .post('/api/v1/items')
        .send({ name: 'Test', cleanliness: 'Sparkling' })
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
  })

  describe('PATCH /api/v1/items/:id', () => {
    it('should return the updated item', done => {
      chai
        .request(server)
        .patch('/api/v1/items/1')
        .send({
          name: 'Test',
          reason: 'We be testing',
          cleanliness: 'Sparkling',
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.an('object')
          res.body.data.should.be.an('array')
          res.body.data.should.have.lengthOf(1)
          res.body.data[0].should.have.property('id').that.is.a('string')
          res.body.data[0].should.have
            .property('type')
            .that.is.a('string')
            .that.equals('items')
          res.body.data[0].attributes.should.have
            .property('name')
            .that.is.a('string')
            .that.equals('Test')
          res.body.data[0].attributes.should.have
            .property('reason')
            .that.is.a('string')
            .that.equals('We be testing')
          res.body.data[0].attributes.should.have
            .property('cleanliness')
            .that.is.a('string')
            .that.equals('Sparkling')
          done()
        })
    })

    it('should return 404 if the item does not exist', done => {
      chai
        .request(server)
        .patch('/api/v1/items/9999')
        .send({
          name: 'Test',
          reason: 'We be testing',
          cleanliness: 'Sparkling',
        })
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })

  describe('DELETE /api/v1/items/:id', () => {
    it('should return status 200', done => {
      chai.request(server).delete('/api/v1/items/1').end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.an('object')
        res.body.should.have.property('success', 'successfully deleted item 1')
        done()
      })
    })

    it('should return 404 if the item does not exist', done => {
      chai.request(server).delete('/api/v1/items/9999').end((err, res) => {
        res.should.have.status(404)
        done()
      })
    })
  })
})
