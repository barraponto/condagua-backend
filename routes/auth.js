const express = require('express');
const axios = require('axios');
const User = require('../models/user');
const { requiredFields } = require('./utils');
const { FACEBOOK_APP_ACCESS_TOKEN } = require('../config');

const FACEBOOK_APP_GRAPH_DEBUG = 'https://graph.facebook.com/debug_token';
const router = express.Router();

/* GET users listing. */
router.post('/facebook', requiredFields([ 'accessToken' ]), (req, res, next) =>
  axios.get(FACEBOOK_APP_GRAPH_DEBUG, {
    params: {
      input_token: req.body.accessToken,
      access_token: FACEBOOK_APP_ACCESS_TOKEN,
    }
  })
  .then(({data}) =>
    User.findOrCreate({ social: { facebookId: data.data.user_id } })
  )
  .then(user => res.json({ authToken: user.generateToken() }))
  .catch(next)
);

module.exports = router;
