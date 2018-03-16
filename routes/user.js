const { Router} = require('express');
const { authenticate, requiredFields } = require('./utils');
const Condo = require('../models/condo');
const Hydro = require('../models/hydro');
const router = Router();

router.use(authenticate);

/* GET users listing. */
router.get('/', ({ user }, res) => res.json(user));

router.get('/condos', ({ user }, res) =>
  Condo.find({ manager: user })
    .populate('hydrometers')
    .then(condos => res.json(condos))
);

router.post('/condos',
  requiredFields(['name']),
  ({ body: { name }, user }, res) => Condo.create({ name, manager: user })
    .then((condo) => res.json(condo))
);

router.post('/condos/:id/hydrometers',
  requiredFields(['name']),
  ({ body: { name }, params: { id } }, res) => Hydro.create({ name, condo: id })
      .then((hydro) => res.json(hydro))
);

router.post('/hydrometers/:id/readings',
  requiredFields(['value']),
  ({ body: { value }, params: { id } }, res) =>
    Hydro.findByIdAndUpdate(id, { $push: { readings: { value } } })
      .then((hydro) => res.json(hydro))
);

module.exports = router;
