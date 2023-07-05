const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Purchase = sequelize.define('Purchase', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    imie: {
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
    nazwisko: {
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
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            },
            isEmail: {
                msg: "Pole powinno zawierac prawidłowy adres email"
            }
        }
    },
    telNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: 9,
                msg: "Pole powinno zawierać 9 cyfr"
            },
            isNumeric: {
                msg: "Pole powinno zawierać tylko cyfry"
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            max: {
                args: 10,
                msg: "Maksymalna liczba wynosi 10"
            },
            min: {
                args: 1,
                msg: "Pole nie może zawierać ujemne liczby"
            }
        }
    }
});

module.exports = Purchase;