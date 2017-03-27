var mongoose = require('mongoose');

module.exports = mongoose.model('Budget', {
    userId: String,
    value: Number,
    date: Date
});
