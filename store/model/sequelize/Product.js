const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Product = sequelize.define('Product', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            },
            isAlpha: {
                msg: "Pole powinno zawierać tylko litery"
            }
        }
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            },
            isAlpha: {
                msg: "Pole powinno zawierać tylko litery"
            }
        }
    },
    price: {
        type: Sequelize.FLOAT,
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
    productType_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Pole jest wymagane"
            },
            checkIfNotDefault(){
                if(this.productType_id == -1 || this.productType_id == null){
                    throw new Error("Pole jest wymagane")
                }
            }
        }
    }
});

module.exports = Product;