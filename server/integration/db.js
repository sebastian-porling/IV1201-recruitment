const mongodb = require('mongodb');

exports.loadUsersCollection = async function loadUsersCollection() {
    const client = await mongodb.MongoClient.connect('mongodb://IV1201:IV1201@ds119993.mlab.com:19993/recruitment', {
        useNewUrlParser: true
    });

    return client.db('recruitment').collection('recruitment');
}

