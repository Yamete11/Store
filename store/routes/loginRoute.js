const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.get('/', AuthController.showLoginForm);
router.post('/login', AuthController.login);


module.exports = router;