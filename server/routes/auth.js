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
var validator = require('validator');


var readfromenv= process.env.CONFIG;



 

 /**
 * Registers a user with the given name, email address and password. The email address functions as the users username.
 */
router.post('/register', async function(req, res) {
  try{
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    console.log('registering user');
    assert.strictEqual(true, validator.isEmail(req.body.email), "1");
    const client = await mongoConnection;
    console.log("Connected successfully to mongodb");
    const dbName = 'posts'
    const db = client.db(dbName);
    const collection = db.collection('users');
    var user = await collection.findOne({email: req.body.email});
    if (user) return res.status(400).send({ error:'Email already taken'});
    else{
      const result = await collection.insertOne({name: req.body.name, email: req.body.email, password: hashedPassword, role:'applicant'});
      console.log('new user created ');
      console.log(result.ops[0])
      var token = jwt.sign({ id: result.ops[0]._id }, config, {
                expiresIn: 86400 // expires in 24 hours
      });
      req.session.token = token;
      res.status(200).send({ registered: true, msg:'Registration successful'});
    }
            

  }
  catch(e){
    switch(e.message) {
      case '1':
        console.log('email not valid');
        return res.status(400).send({error: 'email incorrect'});
      // case '2':
      //   console.log('Username or password incorrect');
      //   return res.status(400).send({ error: 'Username or password incorrect'})
        //break;
      default:
        console.log(e.name +': ' + e.message);
        console.trace();
        return res.status(400).send({error: 'Error on the server'});
  }

  }
});

/**
 * Login the user with the given email and password
 */
router.post('/login', async function(req, res) {
  try{
    assert.strictEqual(true, validator.isEmail(req.body.email), "1");

    var client = await mongoConnection;
    console.log("Connected successfully to mongodb");

    dbName = 'posts'
    const db = client.db(dbName);
    const collection = db.collection('users');

    var user = await collection.findOne({email: req.body.email});
    //assert.strictEqual(true, user, "2");
    if (!user) return res.status(400).send({ error: 'Username or password incorrect'});


    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(400).send({ error: 'Username or password incorrect'});
    
    var token = jwt.sign({ id: user._id }, config, {
        expiresIn: 86400 // expires in 24 hours
    });
    req.session.token = token;
    res.status(200).send({ auth: true, msg:'login successful'});
  }

  catch(e){
    //console.log(e.name +': ' + e.message);
    switch(e.message) {
      case '1':
        console.log('email not valid');
        return res.status(400).send({error: 'email incorrect'});

      default:
        console.log(e.name +': ' + e.message);
        console.trace();
        return res.status(400).send({error: 'Error on the server'});
  }
}
 
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
          return res.status(400).send({error: 'No user found.'});
          //return res.status(500).send('No user found.');
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
        return res.status(400).send({error: 'No user found.'});
    }
    else{
        console.log("admin accessed admin page");
        return res.status(200).send('Welcome to the admin page '+ user.name);
    }

    });
});

}
);


module.exports = router;
