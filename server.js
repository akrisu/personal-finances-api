var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var cors = require('cors');

var authenticateController = require('./server/controllers/authenticate-controller');
var categoryController = require('./server/controllers/category-controller');
var budgetController = require('./server/controllers/budget-controller');
var operationController = require('./server/controllers/operation-controller');

var authenticateMiddleware = require('./server/middlewares/authenticate-middleware');

var app = express();
var router = express.Router();
var config = require('./server/config');
config.setConfig();

mongoose.connect(process.env.MONGOOSE_CONNECT);

app.use(cors());
app.use(bodyParser.urlencoded({ extented: true }));
app.use(bodyParser.json());

router.post('/signup', authenticateController.signUp);
router.post('/signin', authenticateController.signIn);

router.post('/category', authenticateMiddleware.verifyUser, authenticateMiddleware.verifyAdmin, categoryController.postCategory);
router.get('/category', authenticateMiddleware.verifyUser, categoryController.getCategories);

router.get('/budget', authenticateMiddleware.verifyUser, budgetController.getBudget);
router.post('/budget', authenticateMiddleware.verifyUser, budgetController.postBudget);

router.get('/operation', authenticateMiddleware.verifyUser, operationController.getOperation);
router.post('/operation', authenticateMiddleware.verifyUser, operationController.postOperation);

app.use('/api', router);

app.listen(8080, function(){
    console.log('server is up');
});
