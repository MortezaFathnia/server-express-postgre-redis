function hello(data) {
  this.log.silly(`In user controller, data: ${JSON.stringify(data)}`);
  return Promise.resolve({
    test: 'hello'
  });
}
function getUser() {
  this.log.silly(`In user controller, data: ${JSON.stringify(data)}`);
  // const users = await User.findAll();
  // console.log(1123,users); 
  return Promise.resolve({
    test: 'hello'
  });
}
module.exports = {
  hello: hello,
  getUser: getUser
};