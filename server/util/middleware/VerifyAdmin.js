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
    
 function verifyAdmin(req, res, next) {
    try{  
        var token = req.session.token;
        console.log(token)
        if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
            
        var decoded = jwt.verify(token, config); 
        console.log(decoded)
        User.then((collection) => { 
            collection.findOne({ _id: new ObjectId(decoded.id)}, function(err, user){
            if (err){ 
                console.log("Error on the server");
                return res.status(500).send('Error on the server.');
            }
            else if(!user){ 
                console.log("No user found");
                return res.status(500).send('No user found.');

            }
            else if(!(user.role === "admin")){
                console.log("unauthorized user attempted to access admin functionality");
                return res.status(401).send({auth: false, message: 'You are not authorized to view this page'})
            }
            else{
                req.userId = decoded.id;
                next()
            }
            });
        });


    }
    catch(e){
        console.log('msglog: '+ e.message);

            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'});

    } 
};   
    
    
module.exports = verifyAdmin;