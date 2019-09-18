const express = require("express");
const morgan = require('morgan');
const router = require('./routes/user');
const postRouter = require('./routes/posts');
const postActionsRouter = require('./routes/postActions');
const globalErrorHandler = require('./controllers/errorController');
const app = express();

app.use(express.json()); // JSON parse 

/**
 * morgan logger as a 3rd party middleware
 */
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));    // logging only while 
}

/**
 * custom middle ware
 */
app.use((req, res, next) => {
    // console.log('Hello from the 3rd middleware');
    req.requestTime = new Date().toISOString();
    next();// to continue the req res cycle
});

/**
 * custom router middleware  
 */
app.use('/api/v1/mongo', router);
app.use('/api/v1/mongo', postRouter);
app.use('/api/v1/mongo', postActionsRouter);



app.all('*', (req, res, next) => {
    next(new Error(`can't find ${req.originalUrl} on this server`)); 
});

app.use(globalErrorHandler);

module.exports = app;