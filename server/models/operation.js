var mongoose = require('mongoose');

module.exports = mongoose.model('Operation', {
    userId: String,
    categoryId: String,
    description: String,
    income: Boolean,
    value: Number,
    date: Date
});
