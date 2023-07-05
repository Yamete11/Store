const ProductRepository = require('../repository/sequelize/ProductRepository')


exports.getProducts = (req, res, next) => {
    ProductRepository.getProducts()
        .then(prods => {res.status(200).json(prods);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProductById = (req, res, next) => {
    const prodId = req.params.prodId;
    ProductRepository.getProductById(prodId)
        .then(prod => {
            if(!prod){
                res.status(404).json({
                    message: 'Product with id: ' + prodId + ' not found'
                })
            } else {
                res.status(200).json(prod);
            }
        });
};

exports.createProduct = (req, res, next) => {
    ProductRepository.createProduct(req.body)
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


exports.updateProduct = (req, res, next) => {
    const prodId = req.params.prodId;
    ProductRepository.updateProduct(prodId, req.body)
        .then(result => {
            res.status(200).json({message: 'Product updated!', prod: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteProduct = (req, res, next) => {
    const prodId = req.params.prodId;
    ProductRepository.deleteProduct(prodId)
        .then(result => {
            res.status(200).json({message: 'Removed product', prod: result});
        })
        .catch( err => {
            if(!err.statusCode){
                err.satusCode  = 500;
            }
            next(err);
        });
};