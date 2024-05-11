import express from "express";

const router = express.Router();

router.route("/sign-up").get(function (req, res) {
    res.render("sign-up");

});

router.route("/sign-in").get(function (req, res) {
    res.render("sign-in");

});

router.route("/sign-in").post(function (req, res) {
    // Generate express session
    req.session.user = {
        email: req.body.email,
        role: req.body.role
    };

    res.status(200).send({ "data": { "message": "Session created." } });
});

router.route("/sign-out").get(function (req, res) {
    req.session = null;
    res.redirect('/sign-in');
});

router.route("/admin-sign-in").get(function (req, res) {
    res.render("admin-sign-in");

});

router.route("/").get(function (req, res) {

    if (!req.session.user) {
        res.redirect('/sign-in');
    } else if (req.session.user.role === 'normal') {
        res.render("home", {
            email: req.session.user.email
        });
    } else if (req.session.user.role === 'admin') {
        res.render("admin-home");
    }

});

export default router;