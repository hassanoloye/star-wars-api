require('dotenv').config()
const config = require('config');

const parsed = require('url').parse(config.get('dbUrl'));

exports.development =  exports.test = exports.production = {
  database: parsed.pathname.slice(1),
  username: parsed.auth.split(':')[0] || '',
  password: parsed.auth.split(':')[1] || '',
  dialect: parsed.protocol.slice(0, -1),
  host: parsed.host.split(':')[0],
  port: parsed.port || 3306,
  operatorsAliases: {}
};
