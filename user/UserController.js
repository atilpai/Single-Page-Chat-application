// UserController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var User = require('./User');

// CREATES A NEW USER
router.post('/register', function (req, res) {
    User.create({
            username : req.body.username,
            password : req.body.password
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});
// LOGIN CHECK
router.post('/login', function (req, res) {
    User.find({
            username : req.body.username,
            password : req.body.password
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem accessing the information to the database.");
            res.status(200).send(user);
        });
});
// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

//ADD MESSAGE TO USER-ROOM
router.post('/emit', function (req, res) {
    console.log('EMITTED');
    
});

module.exports = router;
