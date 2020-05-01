const session = require('express-session');
const config = require('./config');
let RedisStore = require('connect-redis')(session);
const Redis = require('../redis');

module.exports = function (inputConfig) {
  let self = this;
  
  let redis = Redis.call(this);
  
  return session({
    store: new RedisStore({
      client: redis.client
    }),
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge: self.sessionTTL || config.ttl
    },
    secret: self.sessionSecret || config.secret,
    resave: false,
    saveUninitialized: false
  });
}
