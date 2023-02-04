import passport from "passport";
import * as googleAuth from 'passport-google-oauth20';
import { User } from "../models/user.model.js";

const GoogleStrategy = googleAuth.Strategy;

const GOOGLE_CLIENT_ID = '839738067598-2rl0kp5a2fb10nalosh6d8j43cop3piv.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      done(null, profile)
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
