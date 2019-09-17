const mongoose = require('mongoose');

const postActionSchema = new mongoose.Schema({
    likes: {
        likedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    },
    comments: {
        commentedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        },
        body: {
            type: String,
            default: "default comment"
        },
    },
    reports: {
        ropertedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        body: {
            type: String,
            minlength: 10,
            maxlength: 100,
            default: "reason----reportBody"
        },
    }
});

const PostAction = mongoose.model('postAction', postActionSchema);

module.exports = PostAction;