const express = require('express');
const router = express.Router();


const productController = require('../controllers/productController');
const authUtils = require("../util/authUtils");

router.get('/', productController.showProductList);
router.get('/add',productController.showAddProductForm);
router.get('/edit/:prodId',productController.showEditProductForm);
router.get('/details/:prodId', productController.showProductDetails);

router.post('/add', productController.addProduct);
router.post('/edit',productController.updateProduct);
router.get('/delete/:prodId',productController.deleteProduct)

module.exports = router;