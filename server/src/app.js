const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
const tokensRouter = require('./routes/tokensRouter');
const authRouter = require('./routes/authRouter');
const generateRouter = require('./routes/generateRouter');
const favoriteRouter = require('./routes/favoriteRouter');
const cartRouter = require('./routes/cartRouter');
const saveImageRouter = require('./routes/saveImageRouter');
const path = require('path');


app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokensRouter);
app.use('/api/gensock', generateRouter);
app.use('/api/favorites', favoriteRouter);
app.use('/api/cart', cartRouter);
app.use('/api/saveimage', saveImageRouter)
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.get(/^(?!\/api).*/, (req, res) => {  // Игнорирует пути, начинающиеся с /api
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });

module.exports = app;
