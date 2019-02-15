[![Build Status](https://travis-ci.org/sebastian-porling/IV1201-recruitment.svg?branch=master)](https://travis-ci.org/sebastian-porling/IV1201-recruitment)
# Recruitment application - IV1201, Arkitektur och design av globala applikationer

This is a Node.js application. It uses [Express.js](https://expressjs.com/) for back-end, 
[MongoDB](https://www.mongodb.com/) for the database, [Vue.js](https://vuejs.org/) for front-end and
[Mocha.js](https://mochajs.org/) for testing.

## Install / Setup

Install application with:
```bash
npm install     # To install all dependencies
```

Run server from root.
Will run on http://localhost:5000/
```bash
npm run dev     # For development server,
                # Automatic reload with nodemon
npm start       # For production server
```

Run front-end server from /client/
Will run on http://localhost:8080/
```bash
npm run serve   # For starting front-end development server
```

Build the front-end by:
```bash
npm run build   # Will build the project in /server/public
```

To run tests locally use:
```bash
npm test # This will run the tests located in /test
```

After a push or pull request it will run the tests on [Travis](https://travis-ci.org/).

You can now publish the application on your cloud service.