const catchAsync = require('../utils/catchAsync');
const PostData = require('../models/post');
const PostActionData = require('../models/postAction');

/**
 * api to insert data in postAction collection
 */
exports.createAction = catchAsync(async (req, res, next) => {
    const { userActionType } = req.body;
    if (userActionType) {
        /**
         * for like/dislike
         */
        if (userActionType === 'like') {
            let freshLike = {
                userActionType: req.body.userActionType,
                userId: req.params.userId,
                postId: req.params.postId
            }
            let filter = await PostActionData.findOne({
                $and: [
                    { userId: req.params.userId },
                    { userActionType: 'like' },
                    { postId: req.params.postId }]
            });
            if (filter === null) {
                let data = await PostActionData.create(freshLike);
                let updateCount = await PostData.updateOne({ _id: req.params.postId }, { $inc: { "impressions.likeCount": 1 } });
                return res.status(201).json({
                    statusCode: 201,
                    message: 'success',
                    data: data
                });
            }
            else {
                let data = await PostActionData.deleteOne({ _id: filter.id });
                let updateCount = await PostData.updateOne({ _id: req.params.postId }, { $inc: { "impressions.likeCount": -1 } });
                return res.status(200).json({
                    statusCode: 200,
                    message: 'success',
                    data: 'count decremented'
                });
            }
        }
        /**
         * for comment
         */
        if (userActionType === 'comment') {
            // return console.log('asfjbakfj');
            if (!req.body.textBody) {
                return next(new Error('please enter the comment body'), 400);
            }
            let comment = {
                userActionType: req.body.userActionType,
                userId: req.params.userId,
                postId: req.params.postId,
                textBody: req.body.textBody
            }
            let data = await PostActionData.create(comment);
            let updateCount = await PostData.updateOne(
                { _id: req.params.postId }, { $inc: { "impressions.commentCount": 1 } }
            );
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: data
            });

        }
        /**
         * for report
         */
        if (userActionType === 'report') {
            if (!req.body.textBody) {
                return next(new Error('please enter the report body'), 400);
            }
            let filter = await PostActionData.findOne({
                $and: [
                    { userId: req.params.userId },
                    { userActionType: 'report' },
                    { postId: req.params.postId }]
            });
            if (filter === null) {
                let report = {
                    userActionType: req.body.userActionType,
                    userId: req.params.userId,
                    postId: req.params.postId,
                    textBody: req.body.textBody
                }
                let data = await PostActionData.create(report);
                let updateCount = await PostData.updateOne(
                    { _id: req.params.postId }, { $inc: { "impressions.reportCount": 1 } }
                );
                return res.status(201).json({
                    statusCode: 201,
                    message: 'success',
                    data: data
                });
            } return next(new Error('you are not allowed to report multiple times'), 403);
        }
        // wrong post actionType
        else return next(new Error('hi you entered wrong post action type'), 400);
    }
    // if actionType not provided
    else return next(new Error('please enter the userActionType'), 400);
});