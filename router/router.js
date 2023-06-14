const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.getLoginPage);
router.get('/login-choice', authController.getLoginChoicePage);
router.get('/adminlogin', authController.getAdminLoginPage);
router.post('/login', authController.loginUser);
router.post('/adminlogin', authController.loginAdmin);
router.get('/register', authController.getRegisterPage);
router.post('/register', authController.registerUser);

module.exports = router;
