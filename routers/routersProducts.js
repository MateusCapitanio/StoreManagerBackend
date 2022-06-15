const express = require('express');

const router = express.Router();

const { validateProductPost, validateProductPut } = require('../middlewares/products');

const { 
    getProductControl,
    getProductControlId,
    postProductControl,
    putProductControl,
    deleteProductControl,
} = require('../controllers/products');

router.get('/', async (req, res) => {
    getProductControl(res);
});

router.get('/:id', async (req, res) => {
    getProductControlId(req, res);
});

router.post('/', validateProductPost, async (req, res) => {
    postProductControl(req, res);
});

router.put('/:id', validateProductPut, async (req, res) => {
    putProductControl(req, res);
});

router.delete('/:id', async (req, res) => {
    deleteProductControl(req, res);
});

module.exports = router;