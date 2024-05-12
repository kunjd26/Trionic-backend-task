import createError from "http-errors";
import "dotenv/config";
import ejs from "ejs";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import passport from 'passport';
import cookieSession from 'cookie-session';
import './passport.js';
import cors from 'cors';

import authRoute from "./src/auth/AuthRoute.js";
import viewsRoute from "./src/views/ViewsRouter.js";
import eventRoute from "./src/event/EventRoute.js";
import userRoute from "./src/user/UserRoute.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const app = express();

// Global middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.renderFile);
app.set('view engine', 'html');

// Google
app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());

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
app.get('/google-auth/callback/success', async (req, res) => {
    if (!req.user) {
        res.redirect('/google-auth/callback/failure');
    }

    const response = await fetch(`http://${process.env.HOST}:${process.env.PORT}/api/auth/google-auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: req.user.displayName,
            email: req.user.email
        }),
        mode: 'cors'
    });

    const result = await response.json();

    if (!result.error) {
        // Generate express session
        req.session.user = {
            email: req.user.email,
            role: "normal",
            token: result.data.token
        }
        res.redirect('/');
    } else {
        console.log(result.error);
    }
});

// failure 
app.get('/google-auth/callback/failure', (req, res) => {
    res.send("Error");
});


app.use("/", viewsRoute);
app.use("/api/auth", authRoute);
app.use("/api/events", eventRoute);
app.use("/api/users", userRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error", {
        status: err.status,
        message: err.message,
    });
});

// Stat the server.
const PORT = process.env.PORT || 65535;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`App listening on port ${PORT}.`)
});
