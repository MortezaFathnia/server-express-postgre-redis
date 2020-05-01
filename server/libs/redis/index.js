const redis = require('redis');
const config = require('./config');

module.exports = function () {
  let self = this;

  let redisClient = redis.createClient({
    host: config.redisHost,
    port: config.redisPort
  });


  redisClient.on('connect', function () {
    self.log.info('Connected to Redis');
  });

  redisClient.on('error', function (err) {
    self.log.error('Redis error: ' + err);
  });

  return {
    client: redisClient
  };
};