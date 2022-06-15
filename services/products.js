const productsModel = require('../models/products');

const getProducts = (id = null) => {
    if (id) {
        return productsModel.getById(id);
    }
    return productsModel.getAll();
};

const isValid = (name, quantity) => {
    if (!name || typeof name !== 'string') return false;
    if (!quantity || typeof quantity !== 'number') return false;
    return true;
  };

const createProduct = async ({ name, quantity }) => {
    const isValidProduct = isValid(name, quantity);

    if (!isValidProduct) return false;
    
    const { id } = await productsModel.create(name, quantity);
    return {
        id, 
        name, 
        quantity,
    };
};

const updateProduct = async (id, { name, quantity }) => productsModel.update(id, name, quantity);

const excludeProduct = async (id) => {
    const result = await productsModel.exclude(id);
    if (!result) return false;
    return result;
};
// productsModel.exclude(id);

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    excludeProduct,
};