import express from "express";

const router = express.Router();

router.route("/events/show").get(async function (req, res) {
    if (!req.session.user) {
        res.redirect('/sign-in');
    } else if (req.session.user.role === 'normal') {
        res.redirect('/');
    } else if (req.session.user.role === 'admin') {

        const response = await fetch(`http://${process.env.HOST}:${process.env.PORT}/api/events/show`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: req.session.user.email
            }),
            mode: 'cors'
        });

        const result = await response.json();

        if (result.error) {
            console.log(result.error);
        }
        res.render("a-show-events", {
            email: req.session.user.email,
            events: result.data
        });
    }
});

router.route("/events/add").get(function (req, res) {
    if (!req.session.user) {
        res.redirect('/sign-in');
    } else if (req.session.user.role === 'normal') {
        res.redirect('/');
    } else if (req.session.user.role === 'admin') {
        res.render("a-add-events", {
            email: req.session.user.email
        });
    }
});

router.route("/events/update").get(function (req, res) {
    if (!req.session.user) {
        res.redirect('/sign-in');
    } else if (req.session.user.role === 'normal') {
        res.redirect('/');
    } else if (req.session.user.role === 'admin') {
        res.render("a-update-events", {
            email: req.session.user.email
        });
    }
});

router.route("/events/delete").get(function (req, res) {
    if (!req.session.user) {
        res.redirect('/sign-in');
    } else if (req.session.user.role === 'normal') {
        res.redirect('/');
    } else if (req.session.user.role === 'admin') {
        res.render("a-delete-events", {
            email: req.session.user.email
        });
    }
});

export default router;