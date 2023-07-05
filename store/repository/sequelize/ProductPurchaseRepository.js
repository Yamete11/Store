const Sequelize = require('sequelize');

const Product = require('../../model/sequelize/Product');
const Purchase = require('../../model/sequelize/Purchase');
const ProductPurchase = require('../../model/sequelize/ProductPurchase');

exports.getProductPurchases = () => {
    return ProductPurchase.findAll({include: [
            {
                model: Product,
                as: 'product'
            },
            {
                model: Purchase,
                as: 'purchase'
            }
        ]});
};

exports.getProductPurchasesById = (prodPurchId) => {
    return ProductPurchase.findByPk(prodPurchId, {include: [
            {
                model: Product,
                as: 'product'
            },
            {
                model: Purchase,
                as: 'purchase'
            }
        ]});
};

exports.createProductPurchase = (data) => {
    console.log(JSON.stringify(data));

    return ProductPurchase.create({
        product_id: data.product_id,
        purchase_id: data.purchase_id,
        quantity: data.quantity,
        description: data.description
    });
};

exports.updateProductPurchase = (prodPurchId, data) => {
    return ProductPurchase.update(data, { where: { _id: prodPurchId}});
}

exports.deleteProductPurchase = (prodPurchId) => {
    return ProductPurchase.destroy({
        where: { _id: prodPurchId}
    });
};

exports.deleteManyProductPurchases = (prodPurchIds) => {
    return ProductPurchase.findOne({ _id: { [Sequelize.Op.in]: prodPurchIds}})
}