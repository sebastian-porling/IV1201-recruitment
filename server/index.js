const express = require('express');
const bodyParser = require('express');
const cors = require('cors');
var session = require('express-session');
const assert = require('assert');
var authRouter = require('./routes/auth');
const app = express();


//MongoDB 
const MongoStore = require('connect-mongo')(session);
const MongoClient = require('mongodb').MongoClient;
const dbUrl =  process.env.MONGOLAB_URI || 'mongodb://localhost:27017';
const sessiondbName = 'posts';
const client = new MongoClient(dbUrl);
client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to mongodb server");
    var sessiondb = client.db(sessiondbName);
    app.use(session({
        secret: 'sessionSecret',
        cookie: { maxAge: 86400 },
        store: new MongoStore({db: sessiondb }),
        saveUninitialized: true, //Default value. Change?
        resave: true //Default value. Change?
        
    }
    ))
    //Need to use router after session to work correctly possible fix  to move route outside callback
    //would be to await client connect set session using then() and then do app.use after. 
    app.use('/auth', authRouter);
  });


app.use(bodyParser.json());
app.use(cors());
   
  


const posts = require('./routes/posts');
const applications = require('./routes/applications');

app.use('/api/posts', posts);
app.use('/api/applications', applications);

// Handle production
if(process.env.NODE_ENV == 'production'){
    //  Static older
    app.use(express.static(__dirname + '/public/'));

    //  Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));



