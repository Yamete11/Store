const productPurchaseRepository = require('../repository/sequelize/productPurchaseRepository');
const productRepository = require('../repository/sequelize/productRepository');
const purchaseRepository = require('../repository/sequelize/purchaseRepository');

exports.showProductPurchaseList = (req, res, next) => {
    productPurchaseRepository.getProductPurchases()
        .then(prodPurchases => {
            res.render('pages/productPurchase/list', {
                productPurchases: prodPurchases,
                pageTitle: 'Lista zakupów',
                navLocation : 'productPurchase'
            })
        })
}



exports.showAddProductPurchaseForm = (req, res, next) => {
    let allProds, allPurchases;
    productRepository.getProducts()
        .then(prods => {
            allProds = prods
            return purchaseRepository.getPurchases();
        })
        .then(purch => {
            allPurchases = purch;
            res.render('pages/productPurchase/form', {
                productPurchase: {},
                formMode: 'createNew',
                allProds : allProds,
                allPurchases : allPurchases,
                pageTitle: 'Nowe zamówienie',
                btnLabel: 'Dodaj zamówienie',
                formAction: '/productPurchases/add',
                navLocation : 'productPurchase',
                validationErrors: []
            });
        })
}


exports.showEditProductPurchaseForm = (req, res, next) => {
    const prodPurchId = req.params.prodPurchId;
    let allProdPurch, allProds, allPurchases;


    productPurchaseRepository.getProductPurchases()
        .then(prodPurch => {
            allProdPurch = prodPurch
            return productRepository.getProducts();
        }).then(prods => {
            allProds = prods;
            return purchaseRepository.getPurchases();
        }).then(purch => {
            allPurchases = purch;
            return productPurchaseRepository.getProductPurchasesById(prodPurchId);
        })
        .then(productPurchase => {
            res.render('pages/productPurchase/form', {
                productPurchase: productPurchase,
                allProdPurch: allProdPurch,
                allProds: allProds,
                allPurchases: allPurchases,
                formMode: 'edit',
                pageTitle: 'Edycja zamówienia',
                btnLabel: 'Edytuj zamówienie',
                formAction: '/productPurchases/edit',
                navLocation: 'productPurchase',
                validationErrors: []
            });
        });
}

exports.showProductPurchaseDetails = (req, res, next) => {
    const prodPurchId = req.params.prodPurchId;
    let allPurchases, allProds;

    productRepository.getProducts()
        .then(prods => {
            allProds = prods;
            return purchaseRepository.getPurchases();
        }).then(purch => {
            allPurchases = purch;
            return productPurchaseRepository.getProductPurchasesById(prodPurchId)
            })
            .then(productPurchase => {
                res.render('pages/productPurchase/form', {
                    productPurchase: productPurchase,
                    allPurchases: allPurchases,
                    allProds: allProds,
                    formMode: 'showDetails',
                    pageTitle: 'Szczegóły zamówienia',
                    formAction: '',
                    navLocation: 'productPurchase',
                    validationErrors: []
                })
            })
}

exports.addProductPurchase = (req, res, next) => {
    let allProds, error, allPurchases;

    const prodPurchData = { ...req.body};
    productPurchaseRepository.createProductPurchase(prodPurchData)
        .then(result => {
            res.redirect('/productPurchases');
        })
        .catch(err => {
            let allProds, allPurchases;
            productRepository.getProducts()
                .then(prod => {
                    allProds = prod;
                    return purchaseRepository.getPurchases();
                }).then(purch => {
                    allPurchases = purch;
                    res.render('pages/productPurchase/form', {
                        productPurchase: prodPurchData,
                        allProds : allProds,
                        allPurchases : allPurchases,
                        pageTitle: 'Dodawanie zamowienia',
                        formMode: 'createNew',
                        btnLabel: 'Dodaj zamowienie',
                        formAction: '/productPurchases/add',
                        navLocation: 'productPurchase',
                        validationErrors: err.errors
                });
            })
            /*err.errors.forEach( e=> {
                if(e.path.includes('email') && e.type == 'unique violation'){
                    e.message = "Podany adres email jest używany"
                }
            });*/
        });
}

exports.updateProductPurchase = (req, res, next) => {
    const prodPurchId = req.body._id;
    const prodPurchData = { ...req.body};
    productPurchaseRepository.updateProductPurchase(prodPurchId, prodPurchData)
        .then(result => {
            res.redirect('/productPurchases');
        })
        .catch(err => {
            let allProds, allPurchases;
            productRepository.getProducts().then(prod => {
                allProds = prod;
                return purchaseRepository.getPurchases();
            }).then(purch => {
                allPurchases = purch;
                res.render('pages/productPurchase/form', {
                    productPurchase: prodPurchData,
                    allProds: allProds,
                    allPurchases: allPurchases,
                    pageTitle: 'Edycja zamówienia',
                    formMode: 'edit',
                    btnLabel: 'Edytuj zamówienie',
                    formAction: '/productPurchases/edit',
                    navLocation: 'productPurchase',
                    validationErrors: err.errors
                });
            })
        })
}

exports.deleteProductPurchase = (req, res, next) => {
    const prodPurchId = req.params.prodPurchId;
    productPurchaseRepository.deleteProductPurchase(prodPurchId)
        .then( () => {
            res.redirect('/productPurchases');
        })
}

