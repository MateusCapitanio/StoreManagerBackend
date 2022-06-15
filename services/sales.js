const salesModel = require('../models/sales');

const formatSales = ({ product_id: productId, sale_id: saleId, date, quantity }) => ({
        saleId,
        date,
        productId,
        quantity,
});

const getAllSales = async () => {
    const [sales] = await salesModel.getAll();
    const salesFormated = sales.map(formatSales);
    return salesFormated;
};

const getIdSale = async (id) => {
    const [sales] = await salesModel.getById(id);
    if (sales.length > 0) {
        return sales.map(formatSales);
    }
    return false;
};

const createSale = async (reqBody) => {
    const [{ insertId }] = await salesModel.createSaledb();
    const arrayPosts = reqBody.map(({ productId, quantity }) => (
        salesModel.create(productId, quantity, insertId)
    ));
    await Promise.all(arrayPosts);
    const arrayReturn = reqBody.map((e) => e);
    return {
        id: insertId,
        itemsSold: arrayReturn,
      };
};

const updateSale = async (id, [{ productId, quantity }]) => {
    const result = await salesModel.update(id, productId, quantity);
    if (!result) return false;
    return result;
};
    // const [result] = await salesModel.update(id, productId, quantity);
    // if (!result.changedRows) return false;
    // return true;

module.exports = {
    getAllSales,
    getIdSale,
    createSale,
    updateSale,
};