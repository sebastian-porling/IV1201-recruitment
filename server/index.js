const express = require('express');
const bodyParser = require('express');
const cors = require('cors');
var session = require('express-session');
const assert = require('assert');
var authRouter = require('./routes/auth');
const MongoStore = require('connect-mongo')(session);
const MongoClient = require('mongodb').MongoClient;
const maxAge = 43200000; //12 hours (time in miliseconds)

const app = express();


//All code for routes etc should be in this function 
async function init(){

    try{

        const dbUrl =  process.env.MONGOLAB_URI || 'mongodb://localhost:27017';
        const dbName = 'posts';
        const client = new MongoClient(dbUrl);
        connection = await client.connect();
        var db = connection.db(dbName);
            app.use(session({
                secret: 'sessionSecret',
                cookie: { maxAge: maxAge,                   //12 hours },
                store: new MongoStore({db: db}),
                saveUninitialized: true, //Default value. Change?
                resave: true //Default value. Change?
                
            }
            ));
        

        app.use(bodyParser.json());
        app.use(cors());
        
        //var vall = 10;
    //     assert.equal(typeof (vall), 'string',
    //   "argument 'vall' must be a string");
        //await Promise.reject(Error("whops"));
        


        const posts = require('./routes/posts');

        app.use('/api/posts', posts);
        app.use('/auth', authRouter);
        // Handle production
        if(process.env.NODE_ENV == 'production'){
            //  Static older
            app.use(express.static(__dirname + '/public/'));

            //  Handle SPA
            app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
        }

        const port = process.env.PORT || 5000;

        app.listen(port, () => console.log(`Server started on port ${port}`));
    }
    catch(e){
        console.log('msglog: '+ e.message);
        console.log(e.stack)
    }


    
    

};

init();
