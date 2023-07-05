const Product = require('../../model/sequelize/Product');
const Purchase = require('../../model/sequelize/Purchase');
const ProductPurchase = require('../../model/sequelize/ProductPurchase');
const ProductType = require('../../model/sequelize/ProductType');


exports.getProducts = () => {
    return Product.findAll({include: [
            {
                model: ProductType,
                as: 'productType'
            }
        ]});
};

exports.getProductById = (prodId) => {
    return Product.findByPk(prodId, {include: [
        {
               model: ProductPurchase,
               as: 'productPurchases',
               include: [
                   {
                   model: Purchase,
                   as: 'purchase',
               }]
           }]
        },
        {

            model: ProductType,
            as: 'productType'

        });
};

exports.createProduct = (newProdData) => {
    return Product.create({
        title: newProdData.title,
        model: newProdData.model,
        productType_id: newProdData.productType_id,
        price: newProdData.price
    })
};

exports.updateProduct = (prodId, prodData) => {
    const title = prodData.title;
    const model = prodData.model;
    const productType_id = prodData.productType_id;
    const price = prodData.price;
    return Product.update(prodData, {where: {_id: prodId}});
};

exports.deleteProduct = (prodId) => {
    return Product.destroy({
        where: { _id: prodId}
    });
};