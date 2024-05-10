
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "353440378368-hauiji8m16k360pnj1r5t4ndg56p3ifc.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:65535/auth/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));
