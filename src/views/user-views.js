import express from "express";

const router = express.Router();

router.route("/users/events/show").get(async function (req, res) {
    if (!req.session.user) {
        res.redirect('/sign-in');
    } else if (req.session.user.role === 'admin') {
        res.redirect('/');
    } else if (req.session.user.role === 'normal') {

        const response = await fetch(`http://${process.env.HOST}:${process.env.PORT}/api/users/events/show`, {
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
        res.render("n-show-events", {
            email: req.session.user.email,
            events: result.data
        });
    }
});

router.route("/users/events/history").get(async function (req, res) {
    if (!req.session.user) {
        res.redirect('/sign-in');
    } else if (req.session.user.role === 'admin') {
        res.redirect('/');
    } else if (req.session.user.role === 'normal') {

        const response = await fetch(`http://${process.env.HOST}:${process.env.PORT}/api/users/events/history`, {
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
        res.render("n-history-events", {
            email: req.session.user.email,
            events: result.data
        });
    }
});


export default router;