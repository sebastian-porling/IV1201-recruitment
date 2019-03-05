//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var assert = require('assert');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
//let server = require('../server/index');
let should = chai.should();

chai.use(chaiHttp);

/**
 * Test for the Auth REST API.
 */
describe('Auth', function () {
  /**
   * Tests the login
   */
  describe('/POST login ', function () {
    it('it should login ', (done) => {
      let user = {
        email: "bla@mail.com",
        password: "easypassword"
      };
      chai.request("http://127.0.0.1:5000")
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('auth');
          res.body.should.have.property('msg');
          res.body.should.have.property('auth').eql(true);
          done();
        });
    });
    it('should not login because of empty or wrong format on email ', (done) => {
      let user = {
        email: "",
        password: ""
      };
      chai.request("http://127.0.0.1:5000")
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('Username has invalid format');
          done();
        });
    });
    it('should not login because of wrong email ', (done) => {
      let user = {
        email: "test123@test.com",
        password: ""
      };
      chai.request("http://127.0.0.1:5000")
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('Password has invalid format');
          done();
        });
    });
    it('should not login because of wrong password ', (done) => {
      let user = {
        email: "bla@mail.com",
        password: "ss"
      };
      chai.request("http://127.0.0.1:5000")
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('Password has invalid format');
          done();
        });
    });
    it('should throw error becuase of no object  ', (done) => {
      chai.request("http://127.0.0.1:5000")
        .post('/auth/login')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('Username has invalid format');
          done();
        });
    });
    it('should throw error because of empty object ', (done) => {
      let user = {};
      chai.request("http://127.0.0.1:5000")
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('Username has invalid format');
          done();
        });
    });
  });
  /**
   * Test the logout
   */
  describe('/GET logout ', function () {
    it('should logout ', (done) => {
      chai.request("http://127.0.0.1:5000")
        .get('/auth/logout')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('auth');
          res.body.should.have.property('auth').eql(false);
          res.body.should.have.property('msg');
          res.body.should.have.property('msg').eql('You have been logged out.');
          done();
        });
    });
  });
  /**
   * 
   */
  describe('/POST register ', function () {
    it('should not register because of non valid email, wrong format. ', (done) => {
      let user = {
        email: "blafaail.com",
        password: "easypassword"
      };
      chai.request("http://127.0.0.1:5000")
        .post('/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('Name has invalid format.');
          done();
        });
    });
    it('should not register because of non valid email, empty string. ', (done) => {
      let user = {
        email: "",
        password: "easypassword"
      };
      chai.request("http://127.0.0.1:5000")
        .post('/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('Name has invalid format.');
          done();
        });
    });
    it('should not register because email is already used ', (done) => {
      let user = {
        email: "bla@mail.com",
        password: "easypassword"
      };
      chai.request("http://127.0.0.1:5000")
        .post('/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('Name has invalid format.');
          done();
        });
    });
    it('should throw error because of no object sent ', (done) => {
      chai.request("http://127.0.0.1:5000")
        .post('/auth/register')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('Name has invalid format.');
          done();
        });
    });
    it('should throw error because of empty object ', (done) => {
      let user = {
      };
      chai.request("http://127.0.0.1:5000")
        .post('/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('Name has invalid format.');
          done();
        });
    });
    it('should throw error because of object is null ', (done) => {
      let user = null;
      chai.request("http://127.0.0.1:5000")
        .post('/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('Name has invalid format.');
          done();
        });
    });
    /**
     * Not implemented yet, because we don't have any way of removing users.
     */
    it('should register ', (done) => {
      /*const registerUser = {
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
      chai.request('http://127.0.0.1:5000')
      .post('/auth/register')
      .send(registerUser)
      .end((err, res) => {
        
        res.should.have.status(200);
        console.log("registers");
      });
      //now let's login the user before we run any tests
      var authenticatedUser = chai.request.agent('http://127.0.0.1:5000');
      authenticatedUser
      .post('/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        console.log("logs in");
        res.should.have.status(200);
      });
      authenticatedUser
      .delete('/auth/deleteuser/' + userCredentials.password)
      .end((err, res) => {
        console.log("deletes user");
        res.should.have.status(200);
        done();
      });*/
      done();
    });
  });
});