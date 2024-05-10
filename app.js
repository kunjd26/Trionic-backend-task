import createError from "http-errors";
import express from "express";
import "dotenv/config";
import cors from "cors";
import expressSession from "express-session";
import ejs from "ejs";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import authRoute from "./src/auth/AuthRoute.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const app = express();

// view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.renderFile);
app.set('view engine', 'html');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(expressSession({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));

app.use("/api/auth", authRoute);

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
    res.render("error");
});

// Stat the server.
const PORT = process.env.PORT || 65535;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`App listening on port ${PORT}.`)
});
