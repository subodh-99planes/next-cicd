const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'pages'), path.join(__dirname, 'features')],
  },
  env: {
    PORT: 3002,
    localStorageKey: 'is_survey',
    userdataCookie: 'is_session',
    url: 'http://localhost:3002'
  },
}
