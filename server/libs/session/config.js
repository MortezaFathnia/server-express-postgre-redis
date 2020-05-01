let second = 1000;
let minute = 60 * second;
let hour = 60 * minute;

module.exports = {
  redisHost: 'localhost',
  redisPort: 6397,
  secret: 'it is a simple secret',
  ttl: 10 * minute
};