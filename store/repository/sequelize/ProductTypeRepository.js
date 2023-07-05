const ProductType = require('../../model/sequelize/ProductType');
const Product = require('../../model/sequelize/Product');


exports.getProductTypes = () => {
    return ProductType.findAll();
};

exports.getProductTypeById = (prodId) => {
    return ProductType.findByPk(prodId,
        {
            include: [{
                model: Product,
                as: 'product',

            }]
        });
};