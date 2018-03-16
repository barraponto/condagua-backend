const { Router} = require('express');
const { authenticate, requiredFields } = require('./utils');
const Condo = require('../models/condo');
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
  ({ body: { name }, user }, res) => Condo.create({ name, manager: user })
    .then((condo) => res.json(condo))
);

module.exports = router;
