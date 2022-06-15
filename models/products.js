const connection = require('../db');

const getAll = () => connection.execute('SELECT * FROM StoreManager.products');

const getById = (id) => connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
);

const create = async (name, quantity) => {
    const [row] = await connection.execute(
        'INSERT INTO products (name, quantity) VALUES (?, ?)', [name, quantity],
    );
    const result = {
        id: row.insertId,
        name,
        quantity,
    };
    return result;
};

const update = async (id, name, quantity) => {
    await connection.execute(
        'UPDATE products SET name = ?, quantity = ? WHERE id = ?',
        [name, quantity, id],
    );
    return {
        id, 
        name,
        quantity,
    };
};

const exclude = async (id) => {
    await connection.execute(
        'DELETE FROM products WHERE id = ?', [id],
    );
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    exclude,
};