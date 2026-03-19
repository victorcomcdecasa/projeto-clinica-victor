const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login); // Verifique se o nome aqui bate com o do controller

module.exports = router;