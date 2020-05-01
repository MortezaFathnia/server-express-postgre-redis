function hello(data) {
  this.log.silly(`In example controller, data: ${JSON.stringify(data)}`);
  return Promise.resolve({
    test: 'hello'
  });
}

module.exports = {
  hello: hello
};