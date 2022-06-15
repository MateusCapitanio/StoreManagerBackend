const salesService = require('../services/sales');

const getSaleControl = async (res) => {
    const sales = await salesService.getAllSales();

    return res.status(200).json(sales);
};

const getSaleControlId = async (req, res) => {
    const { id } = req.params;
    const sale = await salesService.getIdSale(id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });

    if (sale.length > 1) return res.status(200).json(sale);
    return res.status(200).json(sale);
};

const postSaleControl = async (req, res) => {
    try {
        const result = await salesService.createSale(req.body);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const putSaleControl = async (req, res) => {
    const { id } = req.params;
    const result = await salesService.updateSale(id, req.body);
    return res.status(200).json(result);
};

module.exports = {
    getSaleControl,
    getSaleControlId,
    postSaleControl,
    putSaleControl,
};
