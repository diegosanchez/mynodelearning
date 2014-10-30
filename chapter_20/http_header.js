function writeHeader(header, content) {
  return function(req, res, next) {
    res.setHeader(header, content);
    next();
  }
}

module.exports = writeHeader;
