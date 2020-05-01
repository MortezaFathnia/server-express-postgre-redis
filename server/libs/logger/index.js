const { createLogger } = require('winston');
const transports = require('./transports');

// server environment
let env = 'dev';

let logger = createLogger({
  transports: transports[env],
  exceptionHandlers: transports['exceptions'],
  exitOnError: false
});

logger.stream = {
  write: function (message, encoding) {
    logger.http(message);
  }
};

module.exports = (env) => {
  env = env || 'dev';
  return logger;
};

