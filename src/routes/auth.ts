import express, {Request, Response} from 'express';

import passport from 'passport';
import dotenv from 'dotenv';
import eSeshD from '../types/express-session';
dotenv.config();



const authRouter = express.Router();

authRouter.get('/', passport.authenticate('github', { scope: ['user:email'] }));
authRouter.get(
    '/callback', 
    passport.authenticate('github', { failureRedirect: '/'}),
    function (req, res) {
        res.redirect('/');
    }
);
authRouter.get('/success', async (req: Request, res: Response) => {
    const userInfo = {
        id: req.session.passport?.user.id,
        displayName: req.session.passport?.user.username,
        provider: req.session.passport?.user.provider
    };
    res.render('fb-github-success', { user: userInfo });
});

export default authRouter;
