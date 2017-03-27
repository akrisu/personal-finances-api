var Budget = require('./../models/budget.js');

module.exports.getBudget = function(req, res, next) {
    if (
        !req.query.monthFrom ||
        !req.query.yearFrom ||
        !req.query.monthTo ||
        !req.query.yearTo
    ) {
        var thisYear = new Date().getFullYear();
        var thisMonth = new Date().getMonth();
        var dateFrom = new Date(thisYear, thisMonth, 1);
        var dateTo = new Date(thisYear, thisMonth, 30);
    } else {
        var dateFrom = new Date(req.query.yearFrom, req.query.monthFrom - 1, 1);
        var dateTo = new Date(req.query.yearTo, req.query.monthTo, 0);
    }

    var queryObject = {
        userId: res.userId,
        date: {
            "$gte": dateFrom,
            "$lt": dateTo
        }
    }

    Budget.find(
        queryObject,
        function(err, operationList){
            if (err) {
                return res.status(500).send('Couldn\'t get budget list');
            }

            res.json({ data: operationList })
        }
    );
}

module.exports.postBudget = function(req, res, next) {
    var budget = new Budget();

    if (!req.body.value || res.userId) {
        return res.status(400).send('Couldn\'t create a budget');
    }

    budget.userId = res.userId;
    budget.value = req.body.value;
    budget.date = new Date();

    budget.save(function(err) {
        if (err) {
            return res.status(500).send('Couldn\'t create a budget');
        }

        res.status(201).send('Budget created');
        next();
    });

}
