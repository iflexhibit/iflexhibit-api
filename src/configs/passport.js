const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { google } = require("./config");
const UserRepository = require("../repositories/UserRepository");

module.exports = (passport) => {
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: google.CLIENT_ID,
        clientSecret: google.CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          let user = await UserRepository.findByEmail(profile._json.email);
          if (!user) user = await UserRepository.create(profile);
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "google-dashboard",
    new GoogleStrategy(
      {
        clientID: google.CLIENT_ID,
        clientSecret: google.CLIENT_SECRET,
        callbackURL: "/dashboard/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          let user = await UserRepository.findByEmail(profile._json.email);
          if (!user) user = await UserRepository.create(profile);
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser(async (user, done) => {
    const me = await UserRepository.fetchMe(user.id);
    done(null, me);
  });
};
