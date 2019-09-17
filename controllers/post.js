// const ProductData = require('../models/product');
const catchAsync = require('../utils/catchAsync');
const PostData = require('../models/post');

/**
 * function to add post 
 */
exports.create = catchAsync(async (req, res) => {
    let post = await PostData.create(req.body);
    res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: post
    });
});

/**
 * function to get posts
 */
exports.get = catchAsync(async (req, res) => {

})