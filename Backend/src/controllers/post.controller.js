const postModel = require('../models/post.model');
const {generateCaption} = require("../services/ai.service");

async function createPostController(req, res) {
    const file = req.file;
    
    const base64ImageFile= Buffer.from(file.buffer).toString('base64');
    const caption = await generateCaption(base64ImageFile);
    console.log("Caption: ", caption);
    res.json({caption: caption});



}






module.exports = {createPostController};