// const ProductData = require('../models/product');
const catchAsync = require('../utils/catchAsync');
const PostData = require('../models/post');
const ObjectId  = require('mongoose').Types.ObjectId;
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
 * function to get all posts
 */
exports.get = catchAsync(async (req, res) => {
    let post = await PostData.aggregate([
        { $match: { $and: [{"_id":{"$exists":1}},{ "postAuthor": ObjectId('5d80b8c726078741bae60f50') }] }},
        {$addfields:{}}
    ]);
    res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: post
    });
});

/**
 * function to list posts by user
 */
exports.getPosts = catchAsync(async (req, res) => {

});