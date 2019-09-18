const express = require('express');
const { create, get, getLikedPosts } = require('./../controllers/post')
const { protect } = require('./../controllers/user');


/**
* routes only without params or query string
*/
const postRouter = express.Router();

postRouter.post('/user/post', protect, create);
postRouter.get('/user/:userId/post/?', protect, getLikedPosts);
// postRouter.get('/user/post', protect, get);

module.exports = postRouter;

