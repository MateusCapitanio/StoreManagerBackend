const connection = require('../db');

const getAll = () => connection.execute(
    'SELECT * FROM sales_products INNER JOIN sales ON sales_products.sale_id = sales.id',
);

const getById = (id) => connection.execute(
    (
        `SELECT product_id, quantity, date FROM sales_products 
            INNER JOIN sales ON sales_products.sale_id = sales.id WHERE sale_id = ?`
    ), [id],
);

const createSaledb = async () => connection.execute(
    'INSERT INTO sales (date) VALUES (now())',
);

const create = async (productId, quantity, saleId) => connection.execute(`
        INSERT INTO sales_products (product_id, quantity, sale_id) 
        VALUES (?, ?, ?)`, 
        [productId, quantity, saleId]);

const update = async (id, productId, quantity) => {
    await connection.execute(
        'UPDATE sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?',
        [productId, quantity, id],
    );
    return {
        saleId: id,
        itemUpdated: [
          {
            productId,
            quantity,
          },
        ],
      };
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    createSaledb,
};