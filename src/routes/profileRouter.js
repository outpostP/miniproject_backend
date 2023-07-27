const express = require('express');
const router = express.Router();
const {ProfileController} = require('../controllers');
const { multerUpload } = require('../middleware/multer');
const loginToken = require('../middleware/loginToken');
const resetToken = require('../middleware/resetToken')
const {validateEmail, validatePasswordChange, validatePhone, validateUsername, validateRequest, validatePasswordReset} = require('../middleware/validator')

router.patch('/changeuser', loginToken, validateUsername, validateRequest, ProfileController.changeUsername);
router.patch('/changeemail', loginToken, validateEmail, validateRequest, ProfileController.changeEmail);
router.patch('/changephone', loginToken, validatePhone, validateRequest, ProfileController.changePhone);
router.patch('/changeavatar', loginToken, multerUpload.single('imgProfile') ,ProfileController.changeAvatar);
router.patch('/changepass', loginToken, validatePasswordChange, validateRequest, ProfileController.changePassword);
router.patch('/forgetpass',  ProfileController.forgetPassword);
router.patch('/resetpass', resetToken, validatePasswordReset, validateRequest, ProfileController.resetPassword);


module.exports = router;