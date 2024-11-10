const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth');

authRouter.get('/', authController.getIndex);
authRouter.get('/auth', authController.getAuth);
authRouter.get('/oauth-callback', authController.oAuthCallback);

module.exports = authRouter;

