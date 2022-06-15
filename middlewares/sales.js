const Joi = require('joi');

const sale = Joi.array().items({
        productId: Joi.number().required(),
        quantity: Joi.number().integer().min(1).required(),
    }).messages({
        'any.required': '{{#label}} is required',
        'number.min': '{{#label}} must be greater than or equal to 1',
});

const serializeText = (e) => {
    let altMessage = '"quantity" is required';
    if ((e.message).includes('productId')) {
        altMessage = '"productId" is required';
    }
    if ((e.message).includes('quantity') && (e.context.value <= 0)) {
        altMessage = '"quantity" must be greater than or equal to 1';
    }
    return altMessage;
};

const validateSale = (req, res, next) => {
    const { error } = sale.validate(req.body, { abortEarly: false });

    if (!error) {
        return next();
    }

    const messages = error.details.map((e) => serializeText(e));
    if (messages[0].includes('required')) return res.status(400).json({ message: messages[0] });
    return res.status(422).json({ message: messages[0] });
    // [{ productId, quantity }]

    // if (!productId) return res.status(400).json({ message: '"productId" is required' });
    // if (quantity <= 0) {
    //     return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    // }
    // if (!quantity) return res.status(400).json({ message: '"quantity" is required' });
};

module.exports = validateSale;