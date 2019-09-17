const { promisify } = require('util');
const UserData = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');

/**
 * JWT token generation
 */
const signToken = id => {
    return jwt.sign({ id }, 'my-best-secret-string-xD', {
        expiresIn: Math.floor(Date.now() / 1000) + (60)
    });
}

/**
 * funciton to create user
 */
exports.create = catchAsync(async (req, res) => {
    let newUser = await UserData.create(req.body);
    res.status(201).json({
        statusCode: 201, //201 --> created a new resource
        message: 'success',
        data: newUser
    });
});

/**
 * function to get 5 users
 */
exports.get = catchAsync(async (req, res) => {
    let users = await UserData.find().sort({ createdAt: 1 }).skip(0).limit(5);
    res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: users
    });
});

/**
 * function to login user and generating JWT
 */
exports.login = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    // 1 check if req.body contains email
    if (!email) {
        return next(new Error('please provide email to login!', 400));
    }
    const user = await UserData.findOne({ email });
    // 2 check if email entered is valid and have data in user collection
    if (user === null) {
        return next(new Error('please provide valid email to login! No such email found', 400));
    }
    // 3 generate the token 
    const token = signToken(user._id);
    res.status(200).json({
        statusCode: 200,
        status: 'success',
        token: token,
        message: `Welcome ${user.name.first}`
    });
});

/**
 * get the current user or jwt protect function 
 */
exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) token = req.headers.authorization.split(' ')[1];
    if (!token) return next(new Error('You are not logged in! Please log in to get access.', 401));
    // 2 Verification token
    const decoded = await promisify(jwt.verify)(token, 'my-best-secret-string-xD');
    // 3 Check if user still exists
    const currentUser = await UserData.findById(decoded.id);
    if (!currentUser) return next(new Error('The user belonging to this token does no longer exist.', 401));
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    // console.log(req.user.id);
    next();
})