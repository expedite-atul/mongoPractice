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
            let freshLike = { userActionType: req.body.userActionType, userId: req.params.userId, postId: req.params.postId }
            let data = await PostActionData.create(freshLike);
            let updateCount = await PostData.updateOne(
                { _id: req.params.postId }, { $inc: { "impressions.likeCount": 1 } }
            );
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: data
            });
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
        }
        // wrong post action type
        else return next(new Error('hi you entered wrong post action type'), 400);
    }
    // if action type not provided
    else return next(new Error('please enter the userActionType'), 400);
});