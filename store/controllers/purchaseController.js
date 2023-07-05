const purchaseRepository = require('../repository/sequelize/purchaseRepository');

exports.showPurchaseList = (req, res, next) => {
    purchaseRepository.getPurchases()
        .then(purchases => {
            res.render('pages/purchase/list', {
                purchases: purchases,
                navLocation : 'purchase'
            })
        })
}

exports.showAddPurchaseForm = (req, res, next) => {
    res.render('pages/purchase/form', {
        purchase: {},
        pageTitle: 'Nowe zamówienie',
        formMode: 'createNew',
        btnLabel: 'Dodaj zamówienie',
        formAction: '/purchases/add',
        navLocation : 'purchase',
        validationErrors: []
    });
}

exports.showEditPurchaseForm = (req, res, next) => {
    const purchId = req.params.purchId;
    purchaseRepository.getPurchaseById(purchId)
        .then(purchase => {
            res.render('pages/purchase/form', {
                purchase: purchase,
                formMode: 'edit',
                pageTitle: 'Edycja zamówienia',
                btnLabel: 'Edytuj zamówienie',
                formAction: '/purchases/edit',
                navLocation: 'purchase',
                validationErrors: []
            });
        });
}

exports.showPurchaseDetails = (req, res, next) => {
    const purchId = req.params.purchId;
    purchaseRepository.getPurchaseById(purchId)
        .then(purchase => {
            res.render('pages/purchase/form', {
                purchase: purchase,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły zamówienia',
                formAction: '',
                navLocation: 'purchase',
                validationErrors: []
            })
        })
}

exports.addPurchase = (req, res, next) => {
    const purchData = { ...req.body};
    purchaseRepository.createPurchase(purchData)
        .then(result => {
            res.redirect('/purchases');
        })
        .catch(err => {
            /*err.errors.forEach( e=> {
                if(e.path.includes('email') && e.type == 'unique violation'){
                    e.message = "Podany adres email jest używany"
                }
            });*/
            res.render('pages/purchase/form', {
                purchase: purchData,
                pageTitle: 'Dodawanie zamowienia',
                formMode: 'createNew',
                btnLabel: 'Dodaj zamowienie',
                formAction: '/purchases/add',
                navLocation: 'purchase',
                validationErrors: err.errors
            });
        });
}

exports.updatePurchase = (req, res, next) => {
    const purchId = req.body._id;
    const purchData = { ...req.body};
    purchaseRepository.updatePurchase(purchId, purchData)
        .then(result => {
            res.redirect('/purchases');
        })
        .catch(err => {
            res.render('pages/purchase/form', {
                purchase: purchData,
                pageTitle: 'Edycja zamówienia',
                formMode: 'edit',
                btnLabel: 'Edytuj zamówienie',
                formAction: '/purchases/edit',
                navLocation: 'purchase',
                validationErrors: err.errors
            });
        })
};

exports.deletePurchase = (req, res, next) => {
    const purchId = req.params.purchId;
    purchaseRepository.deletePurchase(purchId)
        .then( () => {
            res.redirect('/purchases');
        })
}
