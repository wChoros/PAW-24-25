const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');
const categoryRouter = require('./routes/category');
const commentRouter = require('./routes/comment');
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/posts', postRouter);
app.use('/categories', categoryRouter);
app.use('/comments', commentRouter);

module.exports = app;