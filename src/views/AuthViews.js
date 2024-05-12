import express from "express";

const router = express.Router();

router.route("/sign-up").get(function (req, res) {
    if (!req.session.user) {
        res.render("sign-up");
    } else {
        res.redirect('/');
    }
});

router.route("/sign-in").get(function (req, res) {
    if (!req.session.user) {
        res.render("sign-in");
    } else {
        if (req.session.user.otp != undefined) {
            req.session.user = null;
        } else if (req.session.user.isOTPVerified) {
            req.session.user = null;
        }
        res.redirect('/');
    }
});

router.route("/sign-in").post(function (req, res) {
    // Generate session
    req.session.user = {
        email: req.body.email,
        role: req.body.role,
        token: req.body.token
    };

    res.status(200).send({ "data": { "message": "Session created." } });
});

router.route("/sign-out").get(function (req, res) {
    req.session = null;
    res.redirect('/sign-in');
});

router.route("/admin/sign-in").get(function (req, res) {
    if (!req.session.user) {
        res.render("a-sign-in");
    } else {
        res.redirect('/');
    }
});

router.route("/admin/sign-in").post(function (req, res) {
    // Generate session
    req.session.user = {
        email: req.body.email,
        role: req.body.role,
        token: req.body.token
    };

    res.status(200).send({ "data": { "message": "Session created." } });
});

router.route("/").get(function (req, res) {

    if (!req.session.user) {
        res.redirect('/sign-in');
    } else if (req.session.user.otp != undefined) {
        res.redirect('/otp-verification');
    } else if (req.session.user.isOTPVerified != undefined) {
        res.redirect('/reset-password');
    } else if (req.session.user.role === 'normal') {
        res.render("home", {
            email: req.session.user.email,
            id: req.session.user.id,
            token: req.session.user.token
        });
    } else if (req.session.user.role === 'admin') {
        res.render("a-home", {
            email: req.session.user.email,
            id: req.session.user.id,
            token: req.session.user.token
        });
    }
});

router.route("/forgot-password").get(function (req, res) {
    if (!req.session.user) {
        res.render("forgot-password");
    } else {
        res.redirect('/');
    }
});

router.route("/forgot-password").post(function (req, res) {
    // Generate session
    req.session.user = {
        email: req.body.email,
        otp: req.body.otp
    };

    res.status(200).send({ "data": { "message": "Session created." } });
});

router.route("/otp-verification").get(function (req, res) {
    if (req.session.user) {
        if (req.session.user.otp == undefined) {
            res.redirect('/');
        } else {
            res.render("otp-verification");
        }
    } else {
        res.redirect('/');
    }
});

router.route("/otp-verification").post(function (req, res) {
    if (req.body.otp == req.session.user.otp) {
        req.session.user.otp = null;
        req.session.user.isOTPVerified = true;
        res.status(200).send({ "data": { "message": "OTP verified." } });
    } else {
        res.status(400).send({ "error": { "message": "Invalid OTP." } });
    }
});

router.route("/reset-password").get(function (req, res) {
    if (req.session.user) {
        if (req.session.user.isOTPVerified == undefined) {
            res.redirect('/');
        } else if (req.session.user.isOTPVerified) {
            res.render("reset-password", {
                email: req.session.user.email
            });
        }
    } else {
        res.redirect('/');
    }
});

export default router;