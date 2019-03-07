//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var assert = require('assert');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
var request = require('supertest');

chai.use(chaiHttp);
/**
 * Test for the Application REST API.
 */

describe('Applications', function () {
  const registerUser = {
    email: "test@applications.com",
    password: "testtest",
    name: "test",
    surname: "test",
    ssn: "19990101-2931"
  }
  var userId = null;
  const userCredentials = {
    email: "test@applications.com",
    password: "testtest"
  }
  const adminCredentials = {
    email: "fake@admin.com",
    password: "fakeAdmin"
  }
  
  //now let's login the user before we run any tests
  var authenticatedUser = chai.request.agent('http://127.0.0.1:5000');
  before((done) => {
    chai.request('http://127.0.0.1:5000')
    .post('/auth/register')
    .send(registerUser)
    .end((err, res) => {
      res.should.have.status(200);
      authenticatedUser
      .post('/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        userId = res.body.user._id;
        timestamp = '2019-03-03T18:14:14.486Z';
        let application = {
          competences: [
            {competence: "Karuselldrift", years_of_experience: 2}
          ],
          availability: [
            {from_date: "2018-02-02", to_date: "2019-02-02"}
          ]
        }
        authenticatedUser
        .post('/api/applications/')
        .send(application)
        .end((err, res) => {
          res.should.have.status(200);
          authenticatedUser.put('/api/applications/primedb/'+userId)
           .end((err, res) => {
            res.should.have.status(200);
            done();
           });
        });
      });
    });    
  });

  after((done) => {
    authenticatedUser
    .post('/auth/login')
    .send(userCredentials)
    .end((err, res) => {
      res.should.have.status(200);
      authenticatedUser
      .delete('/auth/deleteuser/' + userCredentials.password)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('/POST /', function() {
    it('should create application', (done) => {
      authenticatedUser
      .post('/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        let application = {
          competences: [
            {competence: "Karuselldrift", years_of_experience: 2}
          ],
          availability: [
            {from_date: "2018-02-02", to_date: "2019-02-02"}
          ]
        }
        authenticatedUser
        .post('/api/applications/')
        .send(application)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      });
    });
    it('should not create application because not logged in', (done) => {
      let application = {
        competences: [
          {competence: "Karuselldrift", years_of_experience: 2}
        ],
        availability: [
          {from_date: "2018-02-02", to_date: "2019-02-02"}
        ]
      }
      chai.request('http://127.0.0.1:5000')
      .post('/api/applications/')
      .send(application)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  });

  describe('/GET /', function () {
    beforeEach((done) =>{
      authenticatedUser
      .post('/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
    afterEach((done) =>{
      authenticatedUser
      .get('/auth/logout')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
    it('should get application ', (done) => {
      authenticatedUser
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
        done();
      });
    });
    it('should not get application because not logged in', (done) => {
      chai.request('http://127.0.0.1:5000')
      .get('/api/applications/')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  });
  describe('/GET /all', function() {
    afterEach((done) => {
      authenticatedUser
      .post('/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        authenticatedUser
        .get('/auth/logout')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      });
    });
    it('should not get because not authorized', (done) => {
      authenticatedUser
      .post('/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        authenticatedUser
        .get('/api/applications/all')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
      });
    });
    it('should not get because not logged in', (done) => {
      chai.request('http://127.0.0.1:5000')
      .get('/api/applications/all')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
    it('should get all', (done) => {
      authenticatedUser
      .post('/auth/login')
      .send(adminCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        authenticatedUser
        .get('/api/applications/all')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      });
    });
  });
  describe('/GET /:id', function () {
    afterEach((done) => {
      authenticatedUser
      .post('/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        authenticatedUser
        .get('/auth/logout')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      });
    });
    it('should not get application because not authorized', (done) => {
      authenticatedUser
      .post('/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        authenticatedUser
        .get('/api/applications/' + userId)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
      });
    });
    it('should not get application because not logged in', (done) => {
      chai.request('http://127.0.0.1:5000')
      .get('/api/applications/' + userId)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
    it('should get application', (done) => {
      authenticatedUser
      .post('/auth/login')
      .send(adminCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        authenticatedUser
        .get('/api/applications/' + userId)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      });
    });
  });
  describe('/PUT /accept/:id/:timestamp', function () {
    afterEach((done) => {
      authenticatedUser
      .post('/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        authenticatedUser
        .get('/auth/logout')
        .end((err, res) => {
          res.should.have.status(200);
          authenticatedUser.put('/api/applications/primedb/'+userId)
           .end((err, res) => {
            res.should.have.status(200);
            done();
           });
        })    
      });
    });
    it('should not accept application because not authorized', (done) => {
      authenticatedUser
      .post('/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        authenticatedUser
        .put('/api/applications/accept/' + userId + '/'+timestamp)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
      });
    });
    it('should not accept application because not logged in', (done) => {
      chai.request('http://127.0.0.1:5000')
      .put('/api/applications/accept/' + userId + '/'+timestamp)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
    it('should accept application', (done) => {
      authenticatedUser
      .post('/auth/login')
      .send(adminCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        authenticatedUser
        .put('/api/applications/accept/' + userId + '/'+timestamp)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      });
    });
  });
  describe('/GET /reject/:id/:timestamp', function () {
    afterEach((done) => {
      authenticatedUser
      .post('/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        authenticatedUser
        .get('/auth/logout')
        .end((err, res) => {
          res.should.have.status(200);
          authenticatedUser.put('/api/applications/primedb/'+userId)
           .end((err, res) => {
            res.should.have.status(200);
            done();
           });
        });
      });
    });
    it('should not reject application because not authorized', (done) => {
      authenticatedUser
      .post('/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        authenticatedUser
        .put('/api/applications/reject/' + userId + '/' + timestamp)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
      });
    });
    it('should not reject application because not logged in', (done) => {
      chai.request('http://127.0.0.1:5000')
      .put('/api/applications/reject/' + userId + '/'+ timestamp)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
    it('should reject application', (done) => {
      authenticatedUser
      .post('/auth/login')
      .send(adminCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        authenticatedUser
        .put('/api/applications/reject/' + userId + '/'+ timestamp)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      });
    });
  });
  describe('/DELETE /:id', function () {
    afterEach((done) => {
      authenticatedUser
      .post('/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        authenticatedUser
        .get('/auth/logout')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      });
    });
    it('should not delete application because not authorized', (done) => {
      authenticatedUser
      .post('/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        authenticatedUser
        .delete('/api/applications/' + userId)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
      });
    });
    it('should not delete application because not logged in', (done) => {
      chai.request('http://127.0.0.1:5000')
      .delete('/api/applications/' + userId)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
    it('should delete application', (done) => {
      authenticatedUser
      .post('/auth/login')
      .send(adminCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        authenticatedUser
        .delete('/api/applications/' + userId)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      });
    });
  });
});
