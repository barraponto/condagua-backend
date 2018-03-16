const mongoose = require('../mongoose');

const condoSchema = new mongoose.Schema({
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
}, {
  toJSON: { virtuals: true }
});

condoSchema.virtual('hydrometers', {
  ref: 'Hydro',
  localField: '_id',
  foreignField: 'condo'
})

const Condo = mongoose.model('Condo', condoSchema);

module.exports = Condo;
