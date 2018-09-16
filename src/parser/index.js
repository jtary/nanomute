const jison = require('jison')

module.exports = new jison.Parser(require('./grammer'))