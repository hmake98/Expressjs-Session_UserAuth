var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/logout', function (req, res, next) {
  req.session.destroy(function () {
      console.log("user logged out.")
  });
  res.redirect('/');
});

router.post('/submit', function (req, res) {
  if (!req.body.email || !req.body.password) {
    res.status(400);
    res.send("Invalid request");
  } else {
    User.find({
      email: req.body.email
    }).then(user => {
        if(user.length > 0){
          res.render('index', {
            message: "User already exist!"
          });
        }else{
          var newUser = {
            email: req.body.email,
            password: req.body.password
          };
          User.create(newUser).then(user => {
            req.session.user = user;  
            res.redirect('/home');
          }).catch(err => {
            res.status(500).json({
              success: false,
              message: "Unable to add user.",
              error: err
            })
          });
        }
    });
  }
});


module.exports = router;