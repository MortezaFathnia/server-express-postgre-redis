function prependChar(str, char, len) {
  if (!str) {
    return str;
  }
  str += '';
  if (str.length >= len) {
    return str;
  }
  let end = len - str.length;
  for(let i = 0; i < end; i ++) {
    str = char + str;
  }
  return str;
}

module.exports = {
  prependChar: prependChar
};