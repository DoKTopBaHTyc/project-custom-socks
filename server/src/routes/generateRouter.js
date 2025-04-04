const express = require('express');
const ColorController = require('../controllers/ColorController');
const PatternController = require('../controllers/PatternController');
const ImageController = require('../controllers/ImageController');

const generateRouter = express.Router();

generateRouter.route('/colors').get(ColorController.getAllColors);
generateRouter.route('/colors:id').get(ColorController.getOneColor);

generateRouter.route('/patterns').get(PatternController.getAllPatterns);

module.exports = generateRouter;





generateRouter.route('/images').get(ImageController.getAll);
