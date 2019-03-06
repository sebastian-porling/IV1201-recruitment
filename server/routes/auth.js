/** 
 * Routes used for authentication 
 * @module auth
 */
var express = require('express'); 
var router = express.Router();
var bodyParser = require('body-parser');
var Password = require('../model/Password');
var Token = require('../model/Token'); 
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var VerifyUser = require('../model/VerifyUser');
var VerifyAdmin = require('../model/VerifyAdmin');
var User = require('../integration/User');
var validate = require('../model/ValidateAuthentication');
const Applications = require('../integration/Applications');
var Err = require('../utility/ErrorEnums');



 /**
 * Registers a user with the given name, email address and password. The email address functions as the users username.
 * @api {post} /register post user
 */
router.post('/register', validate.validateAuthenticationRoute('/register'), async function(req, res) {
  try{
    var hashedPassword = Password.hashPassword(req.body.password);
    console.log('registering user');
    const userId = await User.addUser(req.body.name, req.body.email, hashedPassword);
    console.log('new user created ');
    var token = Token.createToken(userId);
    req.session.token = token;
    res.status(200).send({ registered: true, msg:'Registration successful'});
    //res.status(200).send({ registered: true});         
  }
  catch(e){
    console.log(typeof(e.message))
    switch(e.message){
      case Err.AuthenticationErrors.EMAIL_TAKEN:
        console.log('Email already taken');
        //return res.status(400).send({error: Err.AuthenticationErrors.EMAIL_TAKEN});
        return res.status(400).send({error: 'Email already taken'});
      case  Err.DatabaseErrors.MONGO_WRITE_TRANSACTION_ERROR:
          return res.status(400).send({error: "writeTransactionError"})
        
      default:
        console.log(e.name +': ' + e.message);
        console.log(e.stack)
        //return res.status(400).send({error: Err.ServerErrors.ERROR_ON_SERVER});
        return res.status(400).send({error: 'Error on the server'});
    }
  }
});

/**
 * Login the user with the given email and password
 * @api {post} /login post user
 */
router.post('/login', validate.validateAuthenticationRoute(), async function(req, res) {
  try{
    console.log('logging in user')
    const user = await User.findUserByEmail(req.body.email);
    if (!user) throw Error(Err.AuthenticationErrors.WRONG_USERNAME_OR_PASSWORD);
    const passwordIsValid = Password.verifyPassword(req.body.password, user.password);
    if (!passwordIsValid) throw Error(Err.AuthenticationErrors.WRONG_USERNAME_OR_PASSWORD);
    var token = Token.createToken(user._id);
    req.session.token = token;
    res.status(200).send({ auth: true, msg:'login successful', user: user, token: token});
    //res.status(200).send({ loggedIn: true});
  }
  catch(e){
    switch(e.message) {
      case Err.AuthenticationErrors.WRONG_USERNAME_OR_PASSWORD:
        console.log('Username or password incorrect')
        //return res.status(400).send({ error: Err.AuthenticationErrors.WRONG_USERNAME_OR_PASSWORD});
        return res.status(400).send({ error: 'Username or password incorrect'});
      default:
        console.log(e.name +': ' + e.message);
        console.log(e.stack)
        //return res.status(400).send({error: Err.ServerErrors.ERROR_ON_SERVER});
        return res.status(400).send({error: 'Error on the server'});

    }
  }
});


/**
 * Login the admin with the given name and password
 * @api {post} /loginadmin post user
 */
router.post('/loginadmin', validate.validateAuthenticationRoute('/loginadmin'), async function(req, res) {
  try{
    console.log('logging in admin')
    const admin = await User.findAdminByName(req.body.name);
    if (!admin) throw Error(Err.AuthenticationErrors.WRONG_USERNAME_OR_PASSWORD);
    const passwordIsValid = Password.verifyPassword(req.body.password, admin.password);
    if (!passwordIsValid) throw Error(Err.AuthenticationErrors.WRONG_USERNAME_OR_PASSWORD);
    var token = Token.createToken(admin._id);
    req.session.token = token;
    res.status(200).send({ auth: true, msg:'admin login successful', admin: admin, token: token});
    //res.status(200).send({ loggedIn: true});
  }
  catch(e){
    switch(e.message) {
      case Err.AuthenticationErrors.WRONG_USERNAME_OR_PASSWORD:
        console.log('Username or password incorrect')
        //return res.status(400).send({ error: Err.AuthenticationErrors.WRONG_USERNAME_OR_PASSWORD});
        return res.status(400).send({ error: 'Username or password incorrect'});
      default:
        console.log(e.name +': ' + e.message);
        console.log(e.stack)
        //return res.status(400).send({error: Err.ServerErrors.ERROR_ON_SERVER});
        return res.status(400).send({error: 'Error on the server'});

    }
  }
});

/**
 * Logut the user current active user. 
 * @api {get} /logout Logsout the user
 */
router.get('/logout', function (req, res) {
  req.session.token = null;
  res.status(200).send({auth: false, msg: 'You have been logged out.' });
  //res.status(200).send({loggedIn: false});
});

/**
 * Returns the user page if the user can be verified.
 * @api {get} /userpage 
 */
router.get('/userpage', VerifyUser, async function(req, res){
  try{
    const user = await User.findUserById(req.userId);
    if(!user) throw Err.AuthorizationErrors.USER_DOESNT_EXIST;
    console.log("user accessed user page");
    return res.status(200).send('Welcome to the user page '+ user.name);
    //return res.status(200).send({accessGrantedUser: true});
  }
  catch(e){
    switch(e.message) {
      case Err.AuthorizationErrors.USER_DOESNT_EXIST:
        console.log("No user found");
        //return res.status(400).send({error: 'No user found.'});
        return res.status(400).send({error: Err.AuthorizationErrors.USER_DOESNT_EXIST});
      default:
        console.log(e.name +': ' + e.message);
        console.log(e.stack)
        return res.status(400).send({error: 'Error on the server'});
        //return res.status(400).send({error: Err.ServerErrors.ERROR_ON_SERVER});
    }
  }
});
/**
 * Returns the admin page if the user can be verified as an admin
 * @api {get} /adminpage
 */
router.get('/adminpage', VerifyAdmin, async function(req, res){
  try{
    const user = await User.findUserById(req.userId);
    if(!user) throw Error(Err.AuthorizationErrors.USER_DOESNT_EXIST);
    console.log("admin accessed admin page");
    return res.status(200).send('Welcome to the admin page '+ user.name);
  }
  catch(e){
    switch(e.message) {
      case Err.AuthorizationErrors.USER_DOESNT_EXIST:
        console.log("No user found");
        return res.status(400).send({error: 'No user found.'});
        //return res.status(400).send({error: Err.AuthorizationErrors.USER_DOESNT_EXIST});
      default:
        console.log(e.name +': ' + e.message);
        console.log(e.stack)
        return res.status(400).send({error: 'Error on the server'});
        //return res.status(400).send({error: Err.ServerErrors.ERROR_ON_SERVER});

    }
  }
});
/**
 * Deletes the currently logged in user. User must provide his/her password to confirm deletion. 
 * @api {delete} /deleteuser
 */
router.delete('/deleteuser/:password', VerifyUser, async function(req, res){
  try{
    const user = await User.findUserById(req.userId);
    console.log(user.password);
    if (!user) throw Error(Err.AuthorizationErrors.USER_DOESNT_EXIST);
    const passwordIsValid = Password.verifyPassword(req.params.password, user.password);
    if (!passwordIsValid) throw Error(Err.AuthorizationErrors.WRONG_PASSWORD);
    await User.deleteUser(req.userId);
    //User has been deleted set token to null.
    req.session.token = null;
    res.status(200).send({ msg: 'user deleted' });
  }
  catch(e){
    switch(e.message) {
      case Err.AuthorizationErrors.USER_DOESNT_EXIST:
        console.log("Couldn't delete user. User not in database")
        return res.status(400).send({ error: "Couldn't delete user. User not in database"});
        //return res.status(400).send({ error: Err.AuthorizationErrors.USER_DOESNT_EXIST});
      case Err.AuthorizationErrors.WRONG_PASSWORD:
        console.log("Couldn't delete user. Password incorrect")
        return res.status(400).send({ error: "Couldn't delete user. Password incorrect"});
        //return res.status(400).send({ error: Err.AuthorizationErrors.WRONG_PASSWORD});
      default:
        console.log(e.name +': ' + e.message);
        console.log(e.stack)
        //return res.status(400).send({error: Err.ServerErrors.ERROR_ON_SERVER});
        return res.status(400).send({error: 'Error on the server'});

    }
  }
});
module.exports = router;

