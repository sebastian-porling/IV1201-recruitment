/**
 * @module index This is the main file for the server. It starts it up.
 */

const express = require('express');
const bodyParser = require('express');
const cors = require('cors');
var session = require('express-session');
var authRouter = require('./routes/auth');
const MongoStore = require('connect-mongo')(session);
const MongoClient = require('mongodb').MongoClient;
const maxAge = 43200000; //12 hours (time in miliseconds)

const app = express();


const mongodb = require('mongodb');
async function transactionTest(){
  try{
  const client = await mongodb.MongoClient.connect('mongodb://localhost:27017/recruitment/admin?replicaSet=rs0', {
    useNewUrlParser: true, replicaSet: 'rs0'
  });
  const db = await client.db('recruitment').collection('test');
  //await db.drop();
  await db.insertOne({trx : 0});
  }
  catch(e){
    console.log(e.message);
    console.log(e.stack);
  }
//   //const client = await mongodb.MongoClient.connect('mongodb://localhost:27017/recruitment/admin?replicaSet=rs0', {
//     const client = await mongodb.MongoClient.connect('mongodb://localhost:27017/?replicaSet=rs0"', {
//   useNewUrlParser: true, replicaSet: 'rs0'
  
// });

// const db = await client.db('recruitment').collection('person');

// // drop and recreate person collection with 2 documents _id 1, 2
// await db.drop();
// await db.insertOne({"_id": 1, "fname": "fname-1", "lname": "lname-1"});
// await db.insertOne({"_id": 2, "fname": "fname-2", "lname": "lname-2"});

// var session1 = await client.startSession();
// //var session1PersonColl = session1.getDatabase('test').getCollection('person');
// //await session1.startTransaction({readConcern: {level: 'snapshot'}, writeConcern: {w: 'majority'}});
// await session1.startTransaction();

// await db.insertOne({"_id": 3, "fname": "fname-3", "lname": "lname-3"}, {session1});

// console.log(await db.find().toArray());
// console.log('\n\n');


// // notice that the insert on session1 is only visible to it.
// console.log(await db.find({},{session1}).toArray());
// console.log('\n\n');
// // commit and end the session
// session1.commitTransaction()
// session1.endSession()

// // show the documents after committing the transaction
// console.log(await db.find().toArray());
// console.log('\n\n');



}


/**
 *  All code for routes etc should be in this function 
 */
async function init() {

  try {

    const dbUrl = process.env.MONGOLAB_URI || 'mongodb://IV1201:IV1201@ds119993.mlab.com:19993/recruitment';
    const dbName = 'recruitment';
    const client = new MongoClient(dbUrl, { useNewUrlParser: true });
    connection = await client.connect();
    var db = connection.db(dbName);
    app.use(session({
      secret: 'sessionSecret',
      cookie: { maxAge: maxAge },                   //12 hours },
      store: new MongoStore({ db: db }),
      saveUninitialized: true, //Default value. Change?
      resave: true //Default value. Change?

    })
    );

    app.use(bodyParser.json());
    app.use(cors());

    const applications = require('./routes/applications');

    app.use('/api/applications', applications);
    app.use('/auth', authRouter);
    // Handle production
    if (process.env.NODE_ENV == 'production') {
      //  Static older
      app.use(express.static(__dirname + '/public/'));

      //  Handle SPA
      app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
    }

    const port = process.env.PORT || 5000;

    app.listen(port, () => console.log(`Server started on port ${port}`));
  }
  catch (e) {
    console.log('msglog: ' + e.message);
    console.log(e.stack)
  }

}

transactionTest();
init();