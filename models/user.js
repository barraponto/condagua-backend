const mongoose = require('../mongoose');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');

const userSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String,
  },
  social: {
    facebookId: String,
  },
  email: String,
});

userSchema.methods.generateToken = function() {
  return jwt.sign({ userId: this.id }, JWT_SECRET, { expiresIn: JWT_EXPIRY});
};

const User = mongoose.model('User', userSchema);

User.findOrCreate = function(condition, data) {
  return this
    .findOne(condition)
    .then(user => user ? user : this.create(data));
}

module.exports = User;
