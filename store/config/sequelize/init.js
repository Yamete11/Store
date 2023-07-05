const sequelize = require('./sequelize');

const Product = require('../../model/sequelize/Product');
const Purchase = require('../../model/sequelize/Purchase');
const ProductPurchase = require('../../model/sequelize/ProductPurchase');
const ProductType = require('../../model/sequelize/ProductType');

const authUtil = require('../../util/authUtils')
const passHash = authUtil.hashPassword('12345');
const passHash1 = authUtil.hashPassword('12344');

module.exports = () => {
    Product.hasMany(ProductPurchase,
        {as: 'productPurchases', foreignKey: {name: 'product_id', allowNull: false},
        constraints: true, onDelete: 'CASCADE'});
    ProductPurchase.belongsTo(Product,  {as: 'product', foreignKey: {name: 'product_id', allowNull: false}});
    Purchase.hasMany(ProductPurchase,
        {as: 'productPurchases', foreignKey: {name: 'purchase_id', allowNull: false},
            constraints: true, onDelete: 'CASCADE'});
    ProductPurchase.belongsTo(Purchase,  {as: 'purchase', foreignKey: {name: 'purchase_id', allowNull: false}});

    ProductType.hasMany(Product,
        {as: 'product', foreignKey: {name: 'productType_id', allowNull: false},
            constraints: true, onDelete: 'CASCADE'});
    Product.belongsTo(ProductType,  {as: 'productType', foreignKey: {name: 'productType_id', allowNull: false}});



    let allProds, allPurchs, allProdTypes;
    return sequelize
        .sync({force: true})
        .then( () => {
            return ProductType.findAll();
        })
        .then(prodTypes => {
            if( !prodTypes || prodTypes.length == 0){
                return ProductType.bulkCreate([
                    {type: 'Sedan'},
                    {type: 'Crossover'},
                    {type: 'Hatchback'}
                ])
                    .then( () => {
                        return ProductType.findAll();
                    });

            } else {
                return prodTypes;
            }
        })
            .then(prodTypes => {
                allProdTypes = prodTypes;
                return Product.findAll();
        })
        .then(prods => {
            if( !prods || prods.length == 0){
                return Product.bulkCreate([
                    {title: 'Mitsubishi', model: 'Lancer',  price: 10.00, productType_id: allProdTypes[0]._id},
                    {title: 'Subaru', model: 'Impreza',  price: 20.00, productType_id: allProdTypes[1]._id},
                    {title: 'Toyota', model: 'Supra',  price: 30.00, productType_id: allProdTypes[2]._id}
                ])
                    .then( () => {
                        return Product.findAll();
                    });

            } else {
                return prods;
            }
        })
        .then(prods => {
            allProds = prods;
            return Purchase.findAll();
        })
        .then( purchs => {
            if( !purchs || purchs.length == 0){
                return Purchase.bulkCreate([
                    {imie: 'Gleb', nazwisko: 'Ivanov', email: 'name@gmail.com', telNumber: '570809759', password: passHash},
                    {imie: 'Lena', nazwisko: 'Mishchuk', email: 'lena.mishchuk@gmail.com', telNumber: '512141155', password: passHash1}
                ])
                    .then( () => {
                        return Product.findAll();
                    });
            } else {
                return purchs;
            }
        })
        .then( purchs => {
            allPurchs = purchs;
            return ProductPurchase.findAll();
        })
        .then( purchls => {
            if( !purchls || purchls.length == 0){
                return ProductPurchase.bulkCreate([
                    {product_id: allProds[0]._id, purchase_id: allPurchs[0]._id, quantity: 1, description: 'First one'},
                    {product_id: allProds[1]._id, purchase_id: allPurchs[0]._id, quantity: 1, description: 'Second one'},
                    {product_id: allProds[0]._id, purchase_id: allPurchs[1]._id, quantity: 1, description: 'Third one'}
                ]);
            } else {
                return purchls;
            }
        });
};