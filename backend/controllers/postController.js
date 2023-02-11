const Post = require('../models/post')
const mongoose = require('mongoose')

// Create new course   =>   /api/v1/admin/course/new
exports.newPost = async (req, res, next) => {


    const post = await Post.create(req.body);

    res.status(201).json({
        success: true,
        post
    })
}

// Get all courses (Admin)  =>   /api/v1/admin/courses
exports.getPosts = async (req, res, next) => {
    const posts = await Post.find();

    res.status(200).json({
        success: true,
        posts
    })

}
exports.getPost = async (req, res) => {
        //const id = req.params.postId;
        //const post = await Post.findById(req.params.postId);
        const post = await Post.findById(req.params.postId);

        //const post = posts.find(item => item._id.toString() === req.params.postId)

        res.status(200).json({
            success: true,
            post
        })
    

}

