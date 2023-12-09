const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "608315267969-70a6tf9mclna0hl74h2asqeqaqese14m.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
