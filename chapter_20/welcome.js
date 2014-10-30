function welcome(req, res, next) {
  res.write('Welcome!');
  next();
}

module.exports = welcome;
