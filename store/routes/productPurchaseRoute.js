const express = require('express');
const router = express.Router();


const productPurchaseController = require('../controllers/productPurchaseController');

router.get('/', productPurchaseController.showProductPurchaseList);
router.get('/add', productPurchaseController.showAddProductPurchaseForm);
router.get('/edit/:prodPurchId', productPurchaseController.showEditProductPurchaseForm);
router.get('/details/:prodPurchId', productPurchaseController.showProductPurchaseDetails);

router.post('/add', productPurchaseController.addProductPurchase);
router.post('/edit', productPurchaseController.updateProductPurchase);
router.get('/delete/:prodPurchId', productPurchaseController.deleteProductPurchase)

module.exports = router;