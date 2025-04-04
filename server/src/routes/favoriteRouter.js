const express = require('express');
const FavoriteController = require('../controllers/FavoriteController');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

const favoriteRouter = express.Router();

favoriteRouter.route('/').get(verifyAccessToken, FavoriteController.getFavorites);

favoriteRouter.route('/:id').delete(verifyAccessToken, FavoriteController.delete);

favoriteRouter.route('/cart/:id').post(verifyAccessToken, FavoriteController.addToCart)



module.exports = favoriteRouter;
