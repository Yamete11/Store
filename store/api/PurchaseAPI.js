const PurchaseRepository = require('../repository/sequelize/PurchaseRepository')


exports.getPurchases = (req, res, next) => {
    PurchaseRepository.getPurchases()
        .then(prods => {res.status(200).json(prods);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getPurchaseById = (req, res, next) => {
    const purchId = req.params.purchId;
    PurchaseRepository.getPurchaseById(prodId)
        .then(prod => {
            if(!prod){
                res.status(404).json({
                    message: 'Purchase with id: ' + purchId + ' not found'
                })
            } else {
                res.status(200).json(prod);
            }
        });
};

exports.createPurchase = (req, res, next) => {
    PurchaseRepository.createPurchase(req.body)
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


exports.updatePurchase = (req, res, next) => {
    const purchId = req.params.purchId;
    PurchaseRepository.updatePurchase(purchId, req.body)
        .then(result => {
            res.status(200).json({message: 'Purchase updated!', purch: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deletePurchase = (req, res, next) => {
    const purchId = req.params.purchId;
    PurchaseRepository.deletePurchase(purchId)
        .then(result => {
            res.status(200).json({message: 'Removed purchase', purch: result});
        })
        .catch( err => {
            if(!err.statusCode){
                err.satusCode  = 500;
            }
            next(err);
        });
};