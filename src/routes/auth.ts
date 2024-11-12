import express, {Request, Response} from 'express';
import User from '../models/user';
import { Strategy as GitHubStrategy } from 'passport-github2';
import passport from 'passport';
import dotenv from 'dotenv';
import eSeshD from '../types/express-session';
dotenv.config();

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_OAUTH_CLIENT_ID ?? '',
    clientSecret: process.env.GITHUB_OAUTH_SECRET ?? '',
    callbackURL: process.env.GITHUB_CALLBACK_URL ?? ''
    },
    async (accessToken: string, refreshToken: string, profile: any, callback: any) => {
        console.log(`ID: ${profile.id}`);
        console.log(`username: ${profile.login}`);
        console.log(`email: ${profile.email}`);
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
            console.log('Creating new user from GitHub OAuth in DB...');
            const newUser = new User({
                username: profile.login,
                email: profile.email,
                profileImage: profile.avatar_url,
                githubId: profile.id,
                githubToken: accessToken,
                createdAt: Date.now(),
                updatedAt: Date.now()
            });
            await newUser.save();

            return callback(null, profile);
        }
        else {
            console.log('Github user already exists in DB...');
            return callback(null, profile);
        }
    }
));

const authRouter = express.Router();

authRouter.get('/', passport.authenticate('github', { scope: ['user:email'] }));
authRouter.get(
    '/callback', 
    passport.authenticate('github', { failureRedirect: '/auth/github/error'}),
    function (req, res) {
        res.redirect('/auth/github/success');
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
