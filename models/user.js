const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');

const userSchema = new mongoose.Schema({
  social: {
    facebookId: String,
  },
  email: String,
});

userSchema.methods.generateToken = function() {
  return jwt.sign({ userId: this.id }, JWT_SECRET, { expires_in: JWT_EXPIRY});
};

const User = mongoose.model('User', userSchema);

User.findOrCreate = function(data) {
  return this.findOne(data)
    then(user => user ? user : this.create(data));
}

module.exports = User;
