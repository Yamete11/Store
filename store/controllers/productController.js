const productRepository = require('../repository/sequelize/productRepository');
const productTypeRepository = require('../repository/sequelize/productTypeRepository');

const i18n = require('i18n');

exports.showProductList = (req, res, next) => {
    productRepository.getProducts()
        .then(products => {
            res.render('pages/product/list', {
                products: products,
                navLocation : 'product'
            })
        })
}

exports.showAddProductForm = (req, res, next) => {
    let allProdTypes;
    productTypeRepository.getProductTypes()
        .then(prodTypes => {
            allProdTypes = prodTypes
            res.render('pages/product/form', {
                product: {},
                allProdTypes: allProdTypes,
                pageTitle: i18n.__('product.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: 'Dodaj produkt',
                formAction: '/products/add',
                navLocation : 'product',
                validationErrors: []
        })

    });
}

exports.showEditProductForm = (req, res, next) => {
    const prodId = req.params.prodId;
    let allProdTypes, allProds;
    productRepository.getProducts()
        .then(Prods => {
            allProds = Prods;
            return productTypeRepository.getProductTypes()
        }).then(ProdTypes => {
            allProdTypes = ProdTypes;
            return productRepository.getProductById(prodId)
        })
            .then(product => {
                res.render('pages/product/form', {
                    product: product,
                    allProdTypes: allProdTypes,
                    allProds: allProds,
                    formMode: 'edit',
                    pageTitle: i18n.__('emp.form.edit.pageTitle'),
                    btnLabel: 'Edytuj produkt',
                    formAction: '/products/edit',
                    navLocation: 'product',
                    validationErrors: []
                });
        });
}

exports.showProductDetails = (req, res, next) => {
    const prodId = req.params.prodId;
    let allProdTypes, allProds;
    productRepository.getProducts()
        .then(Prods => {
            allProds = Prods;
            return productTypeRepository.getProductTypes()
        }).then(ProdTypes => {
        allProdTypes = ProdTypes;
        return productRepository.getProductById(prodId)
    })
        .then(product => {
            res.render('pages/product/form', {
                product: product,
                allProdTypes: allProdTypes,
                formMode: 'showDetails',
                pageTitle: i18n.__('product.list.details'),
                formAction: '',
                navLocation: 'product',
                validationErrors: []
            })
        })
}

exports.addProduct = (req, res, next) => {
    const prodData = { ...req.body};
    productRepository.createProduct(prodData)
        .then(result => {
            res.redirect('/products');
        })
        .catch(err => {
            let allProdTypes;
            productTypeRepository.getProductTypes()
                .then(prods => {
                    allProdTypes = prods;
                    res.render('pages/product/form', {
                        product: prodData,
                        allProdTypes: allProdTypes,
                        pageTitle: 'Dodawanie produktu',
                        formMode: 'createNew',
                        btnLabel: 'Dodaj produkt',
                        formAction: '/products/add',
                        navLocation: 'product',
                        validationErrors: err.errors
                    });
                })
        });
};

exports.updateProduct = (req, res, next) => {
    const prodId = req.body._id;
    const prodData = { ...req.body};
    productRepository.updateProduct(prodId, prodData)
        .then(result => {
            res.redirect('/products');
        })
        .catch(err => {
            res.render('pages/product/form', {
                product: prodData,
                pageTitle: 'Edycja produktu',
                formMode: 'edit',
                btnLabel: 'Edytuj produkt',
                formAction: '/products/edit',
                navLocation: 'product',
                validationErrors: err.errors
        });
    })

}

exports.deleteProduct = (req, res, next) => {
    const prodId = req.params.prodId;
    productRepository.deleteProduct(prodId)
        .then( () => {
            res.redirect('/products');
        })
}
