const { Router} = require('express');
const { authenticate } = require('./utils');
const router = Router();

/* GET users listing. */
router.get('/', authenticate, ({ user }, res) => {
  console.log(user);
  res.json(user);
});

module.exports = router;
