const express = require('express');

const router = express.Router();

const productsController = require('./routersProducts');
const salesController = require('./routersSales');

router.use('/products', productsController);
router.use('/sales', salesController);

module.exports = router;