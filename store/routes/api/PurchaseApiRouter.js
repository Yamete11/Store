const express = require('express');
const router = express.Router();

const purchApiController = require('../../api/PurchaseAPI');

router.get('/', purchApiController.getPurchases);
router.get('/:purchId', purchApiController.getPurchaseById);
router.post('/', purchApiController.createPurchase);
router.put('/:purchId', purchApiController.updatePurchase);
router.delete('/:purchId', purchApiController.deletePurchase);

module.exports = router;