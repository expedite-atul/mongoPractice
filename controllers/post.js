// const ProductData = require('../models/product');
const catchAsync = require('../utils/catchAsync');
const PostData = require('../models/post');
const ObjectId = require('mongoose').Types.ObjectId;
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

});

/**
 * function to list posts by user by types
 */
exports.getAllPostsByUser = catchAsync(async (req, res) => {
    let posts = await PostData.aggregate([
        { $match: { $and: [{ 'postAuthor': ObjectId(req.params.userId) }, { 'content.type': req.query.type }] } },
        { $lookup: { from: "postactions", localField: "postAuthor", foreignField: "userId", as: "data" } },
        { $unwind: '$data' },
        { $project: { 'data.userActionType': 1 } },
        // { $addFields: { "isLiked": 1 } }
    ]);
    res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: posts
    });
});