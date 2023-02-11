const express = require('express')
const router = express.Router();


const {
    newPost,
    getPosts,
    getPost

} = require('../controllers/postController')


router.route('/posts').get(getPosts);
router.route('/newpost').post(newPost);
router.route('/posts/:postId').get(getPost)

module.exports = router;