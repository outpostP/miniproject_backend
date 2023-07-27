const express = require("express");
const router = express.Router();
const {validateRegister, validateLogin, validateRequest,} = require('../middleware/validator')

const {authController} = require('../controllers');

router.post('/register',validateRegister, validateRequest, authController.register);
router.post('/login', validateLogin, validateRequest, authController.login);
router.post('/verify', authController.verify);

module.exports = router;

