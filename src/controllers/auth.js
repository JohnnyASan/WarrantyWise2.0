require('dotenv').config();
const mongodb = require('../utils/mongodb');
var ObjectId = require('mongodb').ObjectId;
const path = require('path');
const axios = require('axios');
const userController = require('./user');

const getIndex = async (req, res) => {
  res.sendFile(path.join(__dirname, '../static/index.html'));
};

const getAuth = async (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}`,
  );
};

const oAuthCallback = async ({ query: { code } }, res) => {
  const body = {
    client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
    client_secret: process.env.GITHUB_OAUTH_SECRET,
    code,
  };
  const opts = { headers: { accept: 'application/json' } };
  axios
    .post('https://github.com/login/oauth/access_token', body, opts)
    .then((_res) => _res.data.access_token)
    .then(async (token) => {
      var userUpsertResponse = await userController.createOrUpdate({ params: { access_token: token}});
      console.log(userUpsertResponse);
      res.redirect(`/dashboard?userId=${userUpsertResponse.githubId}`);
    })
    .catch((err) => res.status(500).json({ err: err.message }));
};

module.exports = {
    getIndex,
    getAuth,
    oAuthCallback
}