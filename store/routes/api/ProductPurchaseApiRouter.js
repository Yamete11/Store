const express = require('express');
const router = express.Router();

const prodPurchApiController = require('../../api/ProductPurchaseAPI');

router.get('/', prodPurchApiController.getProductPurchases);
router.get('/:prodPurchId', prodPurchApiController.getProductPurchaseById);
router.post('/', prodPurchApiController.createProductPurchase);
router.put('/:prodPurchId', prodPurchApiController.updateProductPurchase);
router.delete('/:prodPurchId', prodPurchApiController.deleteProductPurchase);

module.exports = router;