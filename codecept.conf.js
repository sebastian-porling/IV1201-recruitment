const port = process.env.PORT || 8080;
exports.config = {
  tests: './acc_test/*.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://127.0.0.1:' + port
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'IV1201-recruitment'
}
