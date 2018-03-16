const express = require('express');
const axios = require('axios');
const User = require('../models/user');
const { requiredFields } = require('./utils');
const { FACEBOOK_APP_ACCESS_TOKEN } = require('../config');

const FACEBOOK_APP_GRAPH_DEBUG = 'https://graph.facebook.com/debug_token';
const FACEBOOK_APP_USER_PROFILE = 'https://graph.facebook.com'
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
    axios.get(`${FACEBOOK_APP_USER_PROFILE}/${data.data.user_id}`, {
      params: {
      fields: 'id,email,first_name,last_name',
      access_token: FACEBOOK_APP_ACCESS_TOKEN
    }
  }))
  .then(({data}) => {
    const conditions = [ { social: { facebookId: data.id } } ];
    if (data.email) { conditions.push({ email: data.email }); }
    return User.findOrCreate({ $or: conditions }, {
      name: { first: data.first_name, last: data.last_name },
      social: { facebookId: data.id },
      email: data.email,
    })
  })
  .then(user => res.json({ authToken: user.generateToken() }))
  .catch(next)
);

module.exports = router;
