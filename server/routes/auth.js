/** 
 * Routes used for authentication 
 * @module auth
 */

var express = require('express'); 
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var VerifyUser = require('../util/middleware/VerifyUser');
var VerifyAdmin = require('../util/middleware/VerifyAdmin');
config = 'supersecretstuff'
const assert = require('assert');
var mongoConnection = require('../util/mongodb/mongodbConnection');

var User = require('../integration/User');
var ObjectId = require('mongodb').ObjectID;

var readfromenv= process.env.CONFIG;

 /**
 * Registers a user with the given name, email address and password. The email address functions as the users username.
 */

router.post('/register', function(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  console.log('registering user');
  console.log(req.body.email)
  mongoConnection.then((client, err) => {
    assert.equal(null, err);
    console.log("Connected successfully to mongodb");
    dbName = 'posts'
    const db = client.db(dbName);
    const collection = db.collection('recruitment');
    collection.findOne({email: req.body.email}, function(err, user) {
      if (err) return res.status(500).send({ registered: false, msg:'Error on the server.'});
      if (user) return res.status(404).send({ registered: false, msg:'Email already taken'});
      else{
          collection.insertOne({name: req.body.name, email: req.body.email, password: hashedPassword, role:'applicant'},
          function(err, result){
            if(err) return res.status(500).send({ registered: false, msg:'Error on the server.'});
            console.log('new user created ');
            console.log(result.ops[0])
            var token = jwt.sign({ id: result.ops[0]._id }, config, {
              expiresIn: 86400 // expires in 24 hours
            });
            req.session.token = token;
            res.status(200).send({ registered: true, msg:'Registration successful'});
          }
          )

      }
    });
  })
});

/**
 * Login the user with the given email and password
 */

router.post('/login', function(req, res) {
  console.log('usermail '+req.body.email);

  mongoConnection.then((client, err) => {
    assert.equal(null, err);
    console.log("Connected successfully to mongodb");
    dbName = 'recruitment'
    const db = client.db(dbName);
    const collection = db.collection('recruitment');
    collection.findOne({email: req.body.email}, function(err, user) {
      if (err) return res.status(500).send({ auth: false, msg:'Error on the server.'});
      if (!user) return res.status(404).send({ auth: false, msg:'Username or password incorrect'});
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, msg:'Username or password incorrect'});
      console.log('Found one user with email in collection: ');
      console.log(user);
      var token = jwt.sign({ id: user._id }, config, {
        expiresIn: 8640000000000000 // expires in 24 hours
      });
      req.session.token = token;
      res.status(200).send({ auth: true, msg:'login successful'});
   
    });

  });
 
});


/**
 * Logut the user current active user. 
 */

router.get('/logout', function(req, res) {
  req.session.token = null;
  res.status(200).send({auth: false, msg: 'You have been logged out.' });
});

/**
 * Returns the user page if the user can be verified.
 */

router.get('/userpage', VerifyUser, function(req, res, next) {
    User.then((collection) => { 
      collection.findOne({ _id: new ObjectId(req.userId)}, function(err, user){
      if (err){ 
          console.log("Error on the server");
          return res.status(500).send('Error on the server.');
      }
      else if(!user){ 
          console.log("No user found");
          return res.status(500).send('No user found.');
      }
      else{
          console.log("user accessed user page");
          return res.status(200).send('Welcome to the user page '+ user.name);
      }

      });
  });



});

/**
 * Returns the admin page if the user can be verified as an admin
 */

router.get('/adminpage', VerifyAdmin
, function(req, res){
  User.then((collection) => { 
    collection.findOne({ _id: new ObjectId(req.userId)}, function(err, user){
    if (err){ 
        console.log("Error on the server");
        return res.status(500).send('Error on the server.');
    }
    else if(!user){ 
        console.log("No user found");
        return res.status(500).send('No user found.');
    }
    else{
        console.log("admin accessed admin page");
        return res.status(200).send('Welcome to the admin page '+ user.name);
    }

    });
  });
});

module.exports = router;
