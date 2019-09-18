const mongoose = require('mongoose');

const postActionSchema = new mongoose.Schema({
    userActionType: {
        type: String,
        enum: ['like', 'comment', 'report'],
        required: [true, 'please provide action type']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'must have a user Id']
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        required: [true, 'must have a user Id']
    },
    textBody: {
        type: String,
        minlength: 10,
        maxlength: 255,
    }
});

const PostActionData = mongoose.model('postAction', postActionSchema);

module.exports = PostActionData;