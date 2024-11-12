import express, {Request, Response} from 'express';
import User from '../models/user';
import { Strategy as GitHubStrategy } from 'passport-github2';
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_OAUTH_CLIENT_ID ?? '',
  clientSecret: process.env.GITHUB_OAUTH_SECRET ?? '',
  callbackURL: process.env.GITHUB_CALLBACK_URL ?? ''
},
function(accessToken, refreshToken, profile, done) {
  User.findByIdAndUpdate(
    { githubId: profile.id }, 
    function (err, user) {
      return done(err, user);
    },
    { upsert: true }
  );
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
