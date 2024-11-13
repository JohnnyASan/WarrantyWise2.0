import express, {Request, Response} from 'express';

import passport from 'passport';
import dotenv from 'dotenv';
import eSeshD from '../types/express-session';
import User from '../models/user';
import session from 'express-session';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { randomUUID } from 'crypto';

const authApp = express();
const authRouter = express.Router();

dotenv.config();

authApp.use(session({
  secret: process.env.SESSION_SECRET_KEY ?? '',
  resave: false,
  saveUninitialized: true
}));
authApp.use(passport.initialize());
authApp.use(passport.session());

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_OAUTH_CLIENT_ID ?? '',
  clientSecret: process.env.GITHUB_OAUTH_SECRET ?? '',
  callbackURL: process.env.GITHUB_CALLBACK_URL ?? ''
  },
  async (accessToken: string, refreshToken: string, profile: any, callback: any) => {
      console.log("PROFILE_LOG: \n");
      console.log(profile)
      let user = await User.findOne({ githubId: profile.id });
      if (!user) {
          console.log('Creating new user from GitHub OAuth in DB...');
          const newUser = new User({
              username: profile._json.login,
              profileImage: profile._json.avatar_url,
              githubId: profile.id,
              sessionToken: randomUUID(),
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

// Configure Passport authenticated session persistence 
passport.serializeUser((user: any, done) => {
     done(null, user.id); 
    }); 
passport.deserializeUser(async (id: string, done) => {
   try { 
      const user = await User.findOne({githubId: id});
       done(null, user); 
      } catch (err) {
           done(err);
      }
  }
);


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

export { 
    authRouter,
    authApp
};
