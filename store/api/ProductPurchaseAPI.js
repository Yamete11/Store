const ProductPurchaseRepository = require('../repository/sequelize/ProductPurchaseRepository')


exports.getProductPurchases = (req, res, next) => {
    ProductPurchaseRepository.getProductPurchases()
        .then(prods => {res.status(200).json(prods);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProductPurchaseById = (req, res, next) => {
    const prodPurchId = req.params.prodPurchId;
    ProductPurchaseRepository.getProductPurchasesById(prodPurchId)
        .then(prod => {
            if(!prod){
                res.status(404).json({
                    message: 'ProductPurchase with id: ' + prodPurchId + ' not found'
                })
            } else {
                res.status(200).json(prod);
            }
        });
};

exports.createProductPurchase = (req, res, next) => {
    ProductPurchaseRepository.createProductPurchase(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if(!err.statusCode){
                err.satusCode = 500;
            }
            next(err);
        });
};


exports.updateProductPurchase = (req, res, next) => {
    const prodPurchId = req.params.prodPurchId;
    ProductPurchaseRepository.updateProductPurchase(prodPurchId, req.body)
        .then(result => {
            res.status(200).json({message: 'ProductPurchase updated!', prodPurchase: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteProductPurchase = (req, res, next) => {
    const prodPurchId = req.params.prodPurchId;
    ProductPurchaseRepository.deleteProductPurchase(prodPurchId)
        .then(result => {
            res.status(200).json({message: 'Removed productPurchase', prodPurchase: result});
        })
        .catch( err => {
            if(!err.statusCode){
                err.satusCode  = 500;
            }
            next(err);
        });
};