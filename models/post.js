const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: {
            type: String,
            enum: ['text', 'image', 'video'],
            required: [true, 'a content must provide its content-type'],
            default:'text'
        },
        title: {
            type: String,
            minlength: 6,
            maxlength: 20,
            required:[true, 'a post must have a title']
        },
        body: {
            type: String,
            minlength: 30,
            maxlength: 255,
            default:'empty content body',
        }
    },
    impressions: {
        likeCount: {
            type: Number,
            default: 0
        },
        commentCount: {
            type: Number,
            default: 0
        },
        reportCount: {
            type: Number,
            default: 0
        }
    },
    postAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    createdDate: {
        type: Date,
        default: new Date()
    },
    // updatedDate: {
    //     type: Date,
    //     default: new Date()
    // }
});

const PostData = mongoose.model('post', postSchema);

module.exports = PostData;
