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
var validateAuthentication = require('../util/middleware/ValidateAuthentication');
var readfromenv= process.env.CONFIG;

 /**
 * Registers a user with the given name, email address and password. The email address functions as the users username.
 */
router.post('/register', validateAuthentication('/register'), async function(req, res) {
  try{
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    console.log('registering user');
    const client = await mongoConnection;
    console.log("Connected successfully to mongodb");
    const dbName = 'recruitment';
    const db = client.db(dbName);
    const collection = db.collection('recruitment');
    var user = await collection.findOne({email: req.body.email});
    if (user) throw Error('1');
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
        console.log('Email already taken');
        return res.status(400).send({error: 'Email already taken'});
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

router.post('/login', validateAuthentication(), async function(req, res) {
  try{
    var client = await mongoConnection;
    console.log("Connected successfully to mongodb");
    dbName = 'recruitment'
    const db = client.db(dbName);
    const collection = db.collection('recruitment');
    var user = await collection.findOne({email: req.body.email});
    if (!user) throw Error('1');
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) throw Error('1');
    var token = jwt.sign({ id: user._id }, config, {
        expiresIn: 86400 // expires in 24 hours
    });
    req.session.token = token;
    res.status(200).send({ auth: true, msg:'login successful'});
  }
  catch(e){
    switch(e.message) {
      case '1':
        console.log('Username or password incorrect')
        return res.status(400).send({ error: 'Username or password incorrect'});

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
router.get('/userpage', VerifyUser, function(req, res){
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

/**
 * Deletes the currently logged in user. User must provide his/her password to confirm deletion. 
 */
router.delete('/deleteuser', VerifyUser, async function(req, res){
  try{
    const collection = await User;
    const user = await collection.findOne({ _id: new ObjectId(req.userId)});
    if (!user) throw Error('1');
    var passwordIsValid = bcrypt.compareSync(req.params.password, user.password);
    if (!passwordIsValid) throw Error('2');
    await collection.deleteOne({ _id: new ObjectId(req.userId)});
    //User has been deleted set token to null.
    req.session.token = null;
    res.status(200).send({msg:'user deleted'});
  }
  catch(e){
    switch(e.message) {
      case '1':
        console.log("Couldn't delete user. User not in database")
        return res.status(400).send({ error: "Couldn't delete user. User not in database"});
      case '2':
        console.log("Couldn't delete user. Password incorrect")
        return res.status(400).send({ error: "Couldn't delete user. Password incorrect"});
      default:
        console.log(e.name +': ' + e.message);
        console.trace();
        return res.status(400).send({error: 'Error on the server'});
    }
  }
});




module.exports = router;
