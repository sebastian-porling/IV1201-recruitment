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
    app.use('/', authRouter);
  });

//var sessiondb = client.db(sessiondbName);

//const MongoStore = require('connect-mongo')(session);





//const app = express();

// app.use(session({
//     secret: 'sessionSecret',
//     cookie: { maxAge: 86400 },
//     saveUninitialized: true, //Default value. Change?
//     resave: true //Default value. Change?
// }
// ))

//  Middleware
// app.use(session({
//     secret: 'sessionSecret',
//     cookie: { maxAge: 60000 },
//     store: new MongoStore({db: sessiondb })

// }
// ))
app.use(bodyParser.json());
app.use(cors());
   
  


const posts = require('./routes/posts');

app.use('/api/posts', posts);

// Handle production
if(process.env.NODE_ENV == 'production'){
    //  Static older
    app.use(express.static(__dirname + '/public/'));

    //  Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

//var authRouter = require('./routes/auth');


//var mongoConnection = require('./util/mongodb/mongodbConnection');


// app.get('/testmongo', function(req, res, next){
//     if(!req.session){
//       console.log('No session');
//     }
//     req.session.something  = 'blabla' 
//     mongoConnection.then((client, err) => {
//       assert.equal(null, err);
//       console.log("Connected successfully to mongodb");
//       dbName = 'posts'
//       const db = client.db(dbName);
//       const collection = db.collection('testdb');
//       collection.insertMany([
//         {a : 1}, {a : 2}, {a : 3}
//       ], function(err, result) {
//         assert.equal(err, null);
//         assert.equal(3, result.result.n);
//         assert.equal(3, result.ops.length);
//         console.log("Inserted 3 documents into the collection");
//         //callback(result);
//       });
//       res.status(200).send('Connection to mongodb succesful');
  
  
  
//     })
  
//   })

//app.use('/', authRouter);


