
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import "dotenv/config";

passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://${process.env.HOST}:${process.env.PORT}/google-auth/callback`,
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));
