const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const LangController = require('../controllers/LangController');



router.get('/', function(req, res, next){
  res.render('index', {navLocation: 'main'});
});

router.get('/logout', AuthController.logout);
router.get('/changeLang/:lang', LangController.changeLang);
module.exports = router;
