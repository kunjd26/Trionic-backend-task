import express from 'express';
import passport from 'passport';
import cookieSession from 'cookie-session';
import './passport.js';

const app = express();

app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    res.send("<button><a href='/google-auth'>Login With Google</a></button>")
});

// Auth 
app.get('/google-auth', passport.authenticate('google', {
    scope:
        ['email', 'profile']
}));

// Auth Callback 
app.get('/google-auth/callback',
    passport.authenticate('google', {
        successRedirect: '/google-auth/callback/success',
        failureRedirect: '/google-auth/callback/failure'
    }));

// Success 
app.get('/google-auth/callback/success', (req, res) => {
    if (!req.user)
        res.redirect('/google-auth/callback/failure');
    console.log(req.user)
    res.send("Welcome " + req.user.displayName);
});

// failure 
app.get('/google-auth/callback/failure', (req, res) => {
    res.send("Error");
});

app.listen(65535, () => {
    console.log("Server Running on port 65535");
});
