const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');

router.post('/register', validate, authController.register);
router.post('/login', validate, authController.login);
router.post('/logout', authController.logout);

module.exports = router;
