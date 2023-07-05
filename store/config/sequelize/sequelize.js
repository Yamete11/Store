const Sequelize = require('sequelize');

const sequelize = new Sequelize('tin-store-sequelize', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;