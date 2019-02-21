//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var assert = require('assert');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

/**
 * Test for the Application REST API.
 */
describe('Applications', function () {
  describe('/GET /', function () {
    it('should get applications ', (done) => {
      chai.request('http://127.0.0.1:5000')
        .get('/api/applications/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.have.property('_id');
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('surname');
          res.body[0].should.have.property('ssn');
          res.body[0].should.have.property('email');
          res.body[0].should.have.property('_id');
          res.body[0].should.have.property('availability');
          res.body[0].availability.should.be.a('array');
          res.body[0].availability[0].should.have.property('from_date');
          res.body[0].availability[0].should.have.property('to_date');
          res.body[0].should.have.property('competences');
          res.body[0].competences.should.be.a('array');
          res.body[0].competences[0].should.have.property('competence');
          res.body[0].competences[0].should.have.property('years_of_experience');
          res.body[0].should.have.property('status');
          res.body[0].should.have.property('application_date');

          done();
        });
    });
  });
  describe('/GET /:id', function () {

  });
  describe('/POST /', function () {

  });
  describe('/DELETE /:id', function () {

  });
  describe('/PUT /accept/:id', function () {

  });
  describe('/GET /reject/:id', function () {

  });
});