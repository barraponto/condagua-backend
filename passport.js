const passport = require('passport');
const { ExtractJwt, Strategy: JwtStrategy} = require('passport-jwt');
const { JWT_SECRET } = require('./config');
const User = require('./models/user');

passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
  },
  (payload, done) => User.findById(payload.userId)
    .then(user => (user) ? done(null, user) : done(null, false))
    .catch((err) => done(err, false))
));

// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser((userID, done) => done(null, userID));

module.exports = passport;
