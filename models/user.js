const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    gender: {
        type: String,
        enum: ['male', 'female', 'others'],
        required: [true, 'user must provide gender'],
    },
    name: {
        first: {
            type: String,
            required: [true, 'user must provide first name as first'],
            minlength: 2,
            maxlength: 10
        },
        last: {
            type: String,
            required: [true, 'user must provide last name as last']
        }
    },
    location: {
        street: {
            type: String,
            required: [true, 'user must provide street data']
        },
        city: {
            type: String,
            required: [true, 'user must provide city name']
        },
        state: {
            type: String,
            required: [true, 'user must provide state name']
        },
        postalCode: {
            type: Number,
            required: [true, 'user must provide postalCode']
        },
        coordinates: {
            latitude: {
                type: String,
                required: false,
                default: "0.0"
            },
            longitude: {
                type: String,
                required: false,
                default: "0.0"
            }
        },
        timezone: {
            offset: {
                type: String,
                required: false,
                default: "+5:30"
            },
            description: {
                type: String,
                required: false,
                default: "Calcutta,India"
            }
        },
    },
    email: {
        type: String,
        required: [true, 'user must provide email']
    },
    dob: {
        date: {
            type: Date,
            required: [true, 'user must provide date Of birth as dob']
        },
        age: {
            type: Number,
            required: [true, 'user must provide age']
        }
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    contact: {
        mobile: {
            type: Number,
            required: [true, 'user must provide mobile'],
            unique: true
        },
        alternateMobile: {
            type: Number,
            required: [true, 'user must provide alternate mobile'],
            unique: true
        }
    },
    picture: {
        display: {
            type: String,
            required: [true, 'user must provide an image']
        }
    },
    count: {
        postCount: {
            type: Number,
            default: 0
        }
    },
    deviceDetails: [{
        deviceType: {
            type: String,
            default: "Android"
        },
        deviceId: {
            type: String,
            default: Math.random()
        },
        isActive: {
            type: Boolean,
            default: false
        }
    }]
});

const UserData = mongoose.model('user', userSchema);

module.exports = UserData;
