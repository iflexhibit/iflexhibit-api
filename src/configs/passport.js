const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { google } = require("./config");
const { create, findByEmail } = require("../repositories/UserRepository");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: google.CLIENT_ID,
        clientSecret: google.CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          let user = await findByEmail(profile._json.email);
          if (!user) user = await create(profile);
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
};
