var Category = require('./../models/category');

module.exports.getCategories = function(req, res) {
    Category.find({}, function(err, categoryList) {
        if (err) {
            return res.status(500).send('Couldn\'t get category list');
        }

        res.json({data: categoryList});
    });
}

module.exports.postCategory = function(req, res) {
    var category = new Category(req.body);

    category.save(function(err) {
        if (err) {
            return res.status(500).send('Couldn\'t create a category');
        }

        res.status(201).send('Category created');
    });
}
