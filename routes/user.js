const { Router} = require('express');
const { authenticate } = require('./utils');
const Condo = require('../models/condo');
const router = Router();

router.use(authenticate);

/* GET users listing. */
router.get('/', ({ user }, res) => res.json(user));

router.get('/condos', ({ user }, res) =>
  Condo.find({ manager: user })
    .then(condos => res.json(condos))
)

module.exports = router;
