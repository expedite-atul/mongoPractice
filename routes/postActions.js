const express = require('express');
const { createAction } = require('./../controllers/postAction');
const { protect } = require('./../controllers/user');


/**
* routes only without params or query string
*/
const postActionsRouter = express.Router();

postActionsRouter.post('/user/:userId/post/:postId/actions', protect, createAction);
// postRouter.get('/user/post', protect, get);

module.exports = postActionsRouter;

