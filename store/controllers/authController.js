const PurchaseRepository = require('../repository/sequelize/PurchaseRepository');
const authUtil = require("../util/authUtils");

exports.showLoginForm = (req, res, next) => {
    res.render('pages/login/form', {
        pageTitle: 'Log in',
        btnLabel: 'Log in',
        formAction: '/login/login',
        navLocation : 'login',
        validationErrors: []
    });
}


exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    PurchaseRepository.findByEmail(email)
        .then(purch => {
            if(!purch) {
                res.render('pages/login/form', {
                    navLocation: '',
                    loginError: "Nieprawidlowy adres email lub haslo"
                })
            } else if(authUtil.comparePassword(password, purch.password) === true){
                req.session.loggedUser = purch;
                res.redirect('/');
            } else {
                res.render('pages/login/form', {
                    navLocation: '',
                    loginError: "Nieprawidlowy ares email lub haslo"
                })
            }
        })
        .catch(err => {
            console.log(err);
            console.log("LOGGED OUT")
        })
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}
