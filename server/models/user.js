var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    username: String,
    password: String,
    salt: String,
    role: String
});
