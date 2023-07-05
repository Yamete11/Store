const express = require('express');
const router = express.Router();


const purchaseController = require('../controllers/purchaseController');

router.get('/', purchaseController.showPurchaseList);
router.get('/add', purchaseController.showAddPurchaseForm);
router.get('/edit/:purchId', purchaseController.showEditPurchaseForm);
router.get('/details/:purchId', purchaseController.showPurchaseDetails);


router.post('/add', purchaseController.addPurchase);
router.post('/edit', purchaseController.updatePurchase);
router.get('/delete/:purchId', purchaseController.deletePurchase)


module.exports = router;