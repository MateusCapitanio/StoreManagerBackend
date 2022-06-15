const productsService = require('../services/products');

const messageNotFound = 'Product not found';

const getProductControl = async (res) => {
    const [products] = await productsService.getProducts();
    return res.status(200).json(products);
};

const getProductControlId = async (req, res) => {
    const { id } = req.params;
    const [[product]] = await productsService.getProducts(id);
    
    if (product === undefined) return res.status(404).json({ message: messageNotFound });
    
    return res.status(200).json(product);
};

const postProductControl = async (req, res) => {
    try {
        const { name } = req.body;
        const [products] = await productsService.getProducts();
        const isProductHave = products.some((product) => product.name === name);
        if (isProductHave) {
            return res.status(409).json({ message: 'Product already exists' });
        }
        const result = await productsService.createProduct(req.body);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const putProductControl = async (req, res) => {
    try {
        const { id } = req.params;
        const [products] = await productsService.getProducts();
        if ((parseFloat(id) > products.length) || parseFloat(id) <= 0) {
            return res.status(404).json({ message: messageNotFound });
        }
        const result = await productsService.updateProduct(id, req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({ message: messageNotFound });
    }
};

const deleteProductControl = async (req, res) => {
    try {
        const { id } = req.params;
        const [products] = await productsService.getProducts();
        const validateId = products.some((product) => product.id === parseFloat(id));
        if (!validateId) return res.status(404).json({ message: messageNotFound });
        const result = await productsService.excludeProduct(id);
        res.status(204).json(result);
    } catch (error) {
        res.status(404).json({ message: messageNotFound });
    }
};

module.exports = {
    getProductControl,
    getProductControlId,
    postProductControl,
    putProductControl,
    deleteProductControl,
};
