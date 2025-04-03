const express = require('express');

const cartRouter = express.Router();

const cartController = require('../controllers/cartController');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

cartRouter
  .route('/')
  .get(verifyAccessToken, cartController.getAllCartItems)
  .patch(verifyAccessToken, cartController.patchOrderStatus)
  
  cartRouter
  .route('/:id')
  .patch(verifyAccessToken, cartController.patchCartItem)
  .delete(verifyAccessToken, cartController.deleteCartItem)
  .post(verifyAccessToken, cartController.addToFavorites);

module.exports = cartRouter;
