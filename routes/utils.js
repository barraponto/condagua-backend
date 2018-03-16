const requiredFields = (fields) => (req, res, next) => {
  if (fields.every(field => field in req.body)) { return next(); }
  else {
    const missing = fields.filter(field => !(field in req.body));
    return next({ message: `Missing required fields: ${missing.join(', ')}` });
  }
}

module.exports = {
  requiredFields,
};
