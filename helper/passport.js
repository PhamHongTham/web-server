import passport from "passport";
import * as googleAuth from 'passport-google-oauth20';

const GoogleStrategy = googleAuth.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: "839738067598-2rl0kp5a2fb10nalosh6d8j43cop3piv.apps.googleusercontent.com",
      clientSecret: "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",
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
