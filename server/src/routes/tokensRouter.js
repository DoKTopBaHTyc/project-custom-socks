const tokensRouter = require('express').Router();
const { verifyRefreshToken } = require('../middlewares/verifyTokens');
const tokensController = require('../controllers/tokensController');

tokensRouter.get('/refresh', verifyRefreshToken, tokensController.refresh);

module.exports = tokensRouter;
