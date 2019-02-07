/** 
 * Middleware used to verify that an user attempting to access a page/route is an admin. 
 * @module VerifyAdmin 
 */

var jwt = require('jsonwebtoken');
var User = require('../../integration/User');
var ObjectId = require('mongodb').ObjectID;

config = 'supersecretstuff';


/**
 * Verifies that the current client is logged in as a user and has the role admin.  
 * @param req Contains information about the request made by the client to the server.
 * @param res Used to construct a response to the client.
 * @param next The next middleware that should be called if the client is logged in as an admin.
 * @returns 
 */
    
 async function verifyAdmin(req, res, next) {
    try{  
        var token = req.session.token;
        console.log(token)
        if (!token) return res.status(400).send({ error: 'No token provided.' });
            
        var decoded = jwt.verify(token, config);
        console.log(decoded);

        collection = await User;
        user = await collection.findOne({ _id: new ObjectId(decoded.id)});
       
        if(!user){ 
            console.log("No user found");
            return res.status(400).send({error: 'No user found.'});
        }
        else if(!(user.role === "admin")){
            console.log("unauthorized user attempted to access admin functionality");
            return res.status(400).send({error: 'You are not authorized to view this page'})
        }
        else{
            req.userId = decoded.id;
            next()
        }
    

    }
    catch(e){
        switch(e.message) {
            default:
              console.log(e.name +': ' + e.message);
              console.trace();
              return res.status(400).send({error: 'Error on the server'});
        }
    } 
};   
    
    
module.exports = verifyAdmin;