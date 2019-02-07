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

        const dbUrl =  process.env.MONGOLAB_URI || 'mongodb://IV1201:IV1201@ds119993.mlab.com:19993/recruitment';
        const dbName = 'recruitment';
        const client = new MongoClient(dbUrl);
        connection = await client.connect();
        var db = connection.db(dbName);
            app.use(session({
                secret: 'sessionSecret',
                cookie: { maxAge: maxAge},                   //12 hours },
                store: new MongoStore({db: db}),
                saveUninitialized: true, //Default value. Change?
                resave: true //Default value. Change?
                
            })
            );
        
        app.use(bodyParser.json());
        app.use(cors());
        
        const posts = require('./routes/posts');
        const applications = require('./routes/applications');

        app.use('/api/applications', applications);
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
