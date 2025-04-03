const express = require('express');
const ColorController = require('../controllers/ColorController');
const PatternController = require('../controllers/PatternController')

const generateRouter = express.Router();

generateRouter.route('/colors').get(ColorController.getAllColors);
generateRouter.route('/colors:id').get(ColorController.getOneColor);

generateRouter.route('/patterns').get(PatternController.getAllPatterns)

module.exports = generateRouter;
