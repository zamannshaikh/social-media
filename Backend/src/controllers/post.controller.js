const postModel = require('../models/post.model');
const {generateCaption} = require("../services/ai.service");
const { uploadFile } = require('../services/storage.service');
const { v4: uuidv4 } = require('uuid');

async function createPostController(req, res) {
    const file = req.file;
    
    const base64ImageFile= Buffer.from(file.buffer).toString('base64');
    const caption = await generateCaption(base64ImageFile);
    console.log("Caption: ", caption);
    const result = await uploadFile(file.buffer,`${uuidv4()}`);
     
    const newPost = postModel.create({
        image: result.url,
        caption: caption,
        user: req.user._id
    })
    console.log("New Post: ", newPost);
    res.status(201).json({
        message: "Post created successfully",
        post: newPost
    }); 



}






module.exports = {createPostController};