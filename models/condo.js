const mongoose = require('../mongoose');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');

const condoSchema = new mongoose.Schema({
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
});

const Condo = mongoose.model('Condo', condoSchema);

module.exports = Condo;
