// const ProductData = require('../models/product');
const catchAsync = require('../utils/catchAsync');
const PostData = require('../models/post');
const ObjectId = require('mongoose').Types.ObjectId;
/**
 * function to add post 
 */
exports.create = catchAsync(async (req, res) => {
    let post = await PostData.create(req.body);
    // let updateCount = await PostData.updateOne(
    //     { _id: req.params.postId }, { $inc: { "impressions.commentCount": 1 } }
    // );
    res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: post
    });
});

/**
 * function to get all posts
 */
exports.getLikedPosts = catchAsync(async (req, res) => {
    let posts = await PostData.aggregate([
        { $match: { $and: [{ 'postAuthor': ObjectId(req.params.userId) }, { 'content.type': req.query.type }] } },
        { $skip: 0 },
        { $limit: 10 },
        { $lookup: { from: "postactions", localField: "postAuthor", foreignField: "userId", as: "data" } },
        { $addFields: { "isLiked": { "$filter": { "input": "$data","as": "i", "cond": { "$eq": ["$$i.userActionType", 'like'] } } } } },
        { $project: { impressions: 1, postAuthor: 1, isLiked: { $cond: { if: { $isArray: "$isLiked" }, then: { $size: "$isLiked" }, else: "NA" } } } }
    ]);
    res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: posts
    });
});

/**
 * function to list posts by user by types
 */
exports.getAllPostsByUser = catchAsync(async (req, res) => {

});

// { $cond: { if: { $isArray: "$isLiked" }, then: { $size: "$isLiked" }, else: "NA" } }
// 


{
    $lookup:
      {
         from: postactions,
         let: { var a},
         pipeline: [ <pipeline to execute on the joined collection> ],  // Cannot include $out or $merge
         as: <output array field>
      }
  }