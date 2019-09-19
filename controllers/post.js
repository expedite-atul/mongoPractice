// const ProductData = require('../models/product');
const catchAsync = require('../utils/catchAsync');
const UserData = require('../models/user');
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
 * function to get user details and its posts
 */
exports.getLikedPosts = catchAsync(async (req, res) => {
    let userDetail = await UserData.findOne({ _id: req.params.userId }, { _id: 0, name: 1, picture: 1 });
    let imagePosts = await PostData.aggregate([
        { $match: { $and: [{ 'postAuthor': ObjectId(req.params.userId) }, { 'content.type': 'image' }] } },
        { $skip: 0 },
        { $limit: 5 },
        {
            $lookup:
            {
                from: 'postactions',
                let: { 'postId': '$_id' },
                pipeline: [{ $match: { $expr: { $and: [{ $eq: ['$postId', '$$postId'] }, { $eq: ['$userActionType', 'like'] }] } } },
                ], as: "isLiked"
            }
        },
        { $project: { content: 1, _id: 0, isLiked: { $cond: { if: { $isArray: "$isLiked" }, then: { $size: "$isLiked" }, else: "NA" } } } }
    ]);
    let videoPosts = await PostData.aggregate([
        { $match: { $and: [{ 'postAuthor': ObjectId(req.params.userId) }, { 'content.type': 'video' }] } },
        { $skip: 0 },
        { $limit: 5 },
        {
            $lookup: {
                from: 'postactions', let: { 'postId': '$_id' }, pipeline: [{ $match: { $expr: { $and: [{ $eq: ['$postId', '$$postId'] }, { $eq: ['$userActionType', 'like'] }] } } },
                ], as: "isLiked"
            }
        },
        { $project: { content: 1, _id: 0, isLiked: { $cond: { if: { $isArray: "$isLiked" }, then: { $size: "$isLiked" }, else: "NA" } } } }
    ]);
    let data = await Promise.all([userDetail, imagePosts, videoPosts]).then((values) => {
        return values;
    });
    res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: data
    });
});

/**
 * function to get all posts by all users
 */
exports.getAllPosts = catchAsync(async (req, res) => {
    let posts = await PostData.aggregate([
        { $match: { $and: [{ '_id': { $exists: true } }] } },
        { $skip: 0 },
        { $limit: 10 },
        {
            $lookup:
            {
                from: 'postactions',
                let: { 'currentUser': req.params.userId,'postId':"$_id" },
                pipeline: [{ $match: { $expr: { $and: [{ $eq: ['$userId', '$$currentUser'] }, { $eq: ['$postId', '$$postId'] },{ $eq: ['$userActionType', 'like'] }] } } },
                ], as: "isLiked"
            }
        },
        { $project: { content: 1, _id: 0, impressions: 1, isLiked: { $cond: { if: { $isArray: "$isLiked" }, then: { $size: "$isLiked" }, else: "NA" } } } }
    ]);
    console.log(posts);
    res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: posts
    });
});