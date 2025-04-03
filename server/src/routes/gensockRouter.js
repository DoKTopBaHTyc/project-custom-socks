const express = require('express');
const ImageController = require('../controllers/ImageController');

const gensockRouter = express.Router();

gensockRouter.route('/images').get(ImageController.getAll)

module.exports = gensockRouter;
