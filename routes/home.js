const express = require('express');
const router = express.Router();
const User = require('../models/user');

function checkSignin(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.send("User not logged in!");
    }
}

router.get('/', checkSignin, function (req, res, next) {
    User.find({}).then(users => {
        res.render('home', {
            message: 'This is home page!',
            users
        });
    }).catch(err => {
        res.json({
            success: false,
            message: "No user found!",
            error: err
        });
    });
});

module.exports = router;