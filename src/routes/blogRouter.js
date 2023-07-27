const express = require('express');
const router = express.Router();
const {BlogsController} = require('../controllers');
const loginToken = require('../middleware/loginToken')
const {multerUpload} = require('../middleware/multer')
const {validateContent, validateRequest} = require('../middleware/validator')

router.post('/create', loginToken, validateContent, validateRequest, multerUpload.single('imgBlog'), BlogsController.createBlog);
router.get('/read', BlogsController.getBlogsQuery );
router.get('/read/:id', BlogsController.getBlogId );
router.get('/category/:id', BlogsController.getCategoryId);
router.get('/category', BlogsController.getCategory);

module.exports = router;