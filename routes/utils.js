const passport = require('../passport');

const requiredFields = (fields) => (req, res, next) => {
  if (fields.every(field => field in req.body)) { return next(); }
  else {
    const missing = fields.filter(field => !(field in req.body));
    return next({ message: `Missing required fields: ${missing.join(', ')}` });
  }
}

const authenticate = passport.authenticate('jwt', { session: false });

module.exports = {
  requiredFields,
  authenticate,
};
