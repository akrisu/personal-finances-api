var Operation = require('./../models/operation');

module.exports.getOperation = function(req, res, next) {
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

    if (req.query.categoryId) {
        queryObject.categoryId = req.query.categoryId;
    }

    Operation.find(
        queryObject,
        function(err, operationList){
            if (err) {
                return res.status(500).send('Couldn\'t get operation list');
            }

            res.json({ data: operationList })
        }
    );
}

module.exports.postOperation = function(req, res, next) {
    var operation = new Operation();

    if (
        !req.body.categoryId ||
        !res.userId ||
        !req.body.value ||
        !req.body.income
    ) {
        return res.status(400).send('Couldn\'t create a operation');
    }

    operation.userId = res.userId;
    operation.categoryId = req.body.categoryId;
    operation.description = req.body.description || '';
    operation.income = req.body.income;
    operation.value = req.body.value;
    operation.date = new Date();

    operation.save(function(err) {
        if (err) {
            return res.status(500).send('Couldn\'t create a operation');
        }

        res.status(201).send('Operation created');
        next();
    });
}
