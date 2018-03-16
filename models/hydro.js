const mongoose = require('../mongoose');

const hydroSchema = new mongoose.Schema({
  name: String,
  condo: { type: mongoose.Schema.Types.ObjectId, ref: 'Condo' },
  readings: [{ value: Number, date: { type: Date, default: Date.now } }],
});

const Hydro = mongoose.model('Hydro', hydroSchema);

module.exports = Hydro;
