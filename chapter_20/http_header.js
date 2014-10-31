function writeHeader(header, content) {
  return function(req, res, next) {
    console.log("yy");
    res.setHeader(header, content);
    next();
  }
}

module.exports = writeHeader;
