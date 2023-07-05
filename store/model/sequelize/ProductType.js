const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const ProductType = sequelize.define('ProductType', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    }
});

module.exports = ProductType;