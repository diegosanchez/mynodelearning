function helloWorld(req, res, next) {
  res.write('Hello World!');
  next();
}
module.exports = helloWorld;
