const express = require('express');
const bodyParser = require('express');
const cors = require('cors');

const app = express();

//  Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/posts');
const home = require('./routes/home');
const login = require('./routes/login');

app.use('/posts', posts);
app.use('/posts', home);
app.use('/posts', login);

// Handle production
if(process.env.NODE_ENV == 'production'){
    //  Static older
    app.use(express.static(__dirname + '/public/'));

    //  Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
