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
  const registerUser = {
    email: "test@test.com",
    password: "testtest",
    name: "test",
    surname: "test",
    ssn: "19990101-2931"
  }
  const userCredentials = {
    email: "test@test.com",
    password: "testtest"
  }
  
  before((done) => {
    chai.request('http://127.0.0.1:5000')
    .post('/auth/register')
    .send(registerUser)
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  //now let's login the user before we run any tests
  var authenticatedUser = chai.request.agent('http://127.0.0.1:5000');

  after((done) => {
    authenticatedUser
    .post('/auth/login')
    .send(userCredentials)
    .end((err, res) => {
      res.should.have.status(200);
      console.log("logsin");
    });
    authenticatedUser
    .delete('/auth/deleteuser/' + userCredentials.password)
    .end((err, res) => {
      res.should.have.status(200);
      console.log("delete");
      done();
    });
  });
  
  describe('/POST /', function() {

  });

  describe('/GET /', function () {
    beforeEach((done) =>{
      authenticatedUser
      .post('/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);
      });
      done();
    });
    afterEach((done) =>{
      authenticatedUser
      .post('/auth/logout')
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
    it('should get applications ', (done) => {
      authenticatedUser
        .get('/api/applications/')
        .end((err, res) => {
          console.log("hej");
          res.should.have.status(200);
          console.log(res.body);
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