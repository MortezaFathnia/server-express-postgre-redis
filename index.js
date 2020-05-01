const Server = require('./server/server');

let server = new Server({
  port: 8080,
  env: 'dev',
  sessionTTL: 10 * 60 * 1000, //10 minutes
  sessionSecret: 'IT IS A SECRET KEY'
});

server.start();
