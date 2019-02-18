exports.config = {
  tests: './acc_test/*.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:8080'
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'IV1201-recruitment'
}