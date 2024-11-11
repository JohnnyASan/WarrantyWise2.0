import express from 'express';
import { getIndex, getAuth, oAuthCallback } from '../controllers/authController';

const authRouter = express.Router();

authRouter.get('/', getIndex);
authRouter.get('/auth', getAuth);
authRouter.get('/oauth-callback', oAuthCallback);

export default authRouter;
