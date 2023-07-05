const Product = require('../../model/sequelize/Product');
const Purchase = require('../../model/sequelize/Purchase');
const ProductPurchase = require('../../model/sequelize/ProductPurchase');
const authUtils = require("../../util/authUtils");

exports.getPurchases = () => {
    return Purchase.findAll();
};

exports.getPurchaseById = (purchId) => {
    return Purchase.findByPk(purchId,
        {
            include: [{
                model: ProductPurchase,
                as: 'productPurchases',
                include: [{
                    model: Product,
                    as: 'product'
                }]
            }]
        });
};

exports.createPurchase = (newPurchData) => {
    return Purchase.create({
        imie: newPurchData.imie,
        nazwisko: newPurchData.nazwisko,
        email: newPurchData.email,
        telNumber: newPurchData.telNumber,
        password: authUtils.hashPassword(newPurchData.password)
    })
};

exports.updatePurchase = (purchId, purchData) => {
    const imie = purchData.imie;
    const nazwisko = purchData.nazwisko;
    const email = purchData.email;
    const telNumber = purchData.telNumber;
    //const password = authUtils.hashPassword(purchData.password);
    return Purchase.update(purchData, {where: {_id: purchId}});
};

exports.deletePurchase = (purchId) => {
    return Purchase.destroy({
        where: { _id: purchId}
    });
};

exports.findByEmail = (email) => {
    return Purchase.findOne({
        where: { email: email}
    })
}