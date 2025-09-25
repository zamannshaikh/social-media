const express = require('express');
const authMiddleware=require('../middlewares/authMiddleware');
const {createPostController}=require('../controllers/post.controller');
const multer = require('multer');

const router=express.Router();
const upload = multer({storage: multer.memoryStorage()});

router.post("/post",
    authMiddleware,
    upload.single('image')

    ,createPostController);









module.exports=router;