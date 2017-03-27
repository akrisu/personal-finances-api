var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');

var User = require('./../models/user');

module.exports.signIn = function(req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(500).send('Missing parameters');
    }

    User.findOne({username: req.body.username}, function(err, user){
        if (err || !user) {
            return res.status(500).send('User not found');
        }
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (err || result == false) {
                    return res.status(500).send('Password is incorrect');
                }

                var payload = {
                    username: user.username,
                    role: user.role
                }

                var token = jwt.sign(payload, process.env.SECRET_KEY, {});

                res.json({
                    success: true,
                    token: token
                });
            });
    });
}

module.exports.signUp = function(req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send('Missing parameters');
    }

    User.findOne({username: req.body.username}, function(err, foundUser) {
        var user = new User();

        if (foundUser) {
            return res.status(400).send('User with provided name already exists');
        }

        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return res.status(500).send('Error occured');
            }

            bcrypt.hash(req.body.password, salt, null, function(err, hash) {
                if (err) {
                    return res.status(500).send('Error occured');
                }

                user.salt = salt;
                user.password = hash;
                user.username = req.body.username;
                user.role = "user";
            });
        });

        user.save(function(err) {
            if (err) {
                return res.status(500).send('Error occured');
            }

            res.status(201).send('User created');
        });
    });
}
