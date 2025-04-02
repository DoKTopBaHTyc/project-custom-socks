const authRouter = require('express').Router();
const AuthController = require('../controllers/authController');

authRouter.post('/signup', AuthController.signUp);
authRouter.post('/login', AuthController.logIn);
authRouter.get('/logout', AuthController.logOut);

module.exports = authRouter;
