const express = require('express');

const router = express.Router();

const validateSale = require('../middlewares/sales');

const { 
    getSaleControl, 
    getSaleControlId,
    postSaleControl,
    putSaleControl,
} = require('../controllers/sales');

router.get('/', async (req, res) => {
    getSaleControl(res);
});

router.get('/:id', async (req, res) => {
    getSaleControlId(req, res);
});

router.post('/', validateSale, async (req, res) => {
    postSaleControl(req, res);
});

router.put('/:id', validateSale, async (req, res) => {
    putSaleControl(req, res);
});

module.exports = router;