const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const ProductPurchase = sequelize.define('ProductPurchase', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Pole jest wymagane"
            },
            checkIfNotDefault(){
                if(this.product_id == -1 || this.product_id == null){
                    throw new Error("Pole jest wymagane")
                }
            }
        }
    },
    purchase_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Pole jest wymagane"
            },
            checkIfNotDefault(){
                if(this.purchase_id == -1 || this.purchase_id == null){
                    throw new Error("Pole jest wymagane")
                }
            }
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            max: {
                args: 1000,
                msg: "Maksymalna liczba wynosi 1000"
            },
            min: {
                args: 1,
                msg: "Pole nie może zawierać ujemne liczby"
            }
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [1, 60],
                msg: "Pole powinno zawierać od 1 do 60 znaków"
            },
        }
    }
});

module.exports = ProductPurchase;