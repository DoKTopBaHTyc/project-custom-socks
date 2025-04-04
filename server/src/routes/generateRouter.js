const express = require('express');
const ColorController = require('../controllers/ColorController');
const PatternController = require('../controllers/PatternController');
const ImageController = require('../controllers/ImageController');
const SockController = require('../controllers/SockController');

const generateRouter = express.Router();

generateRouter.route('/colors').get(ColorController.getAllColors);
generateRouter.route('/colors/:id').get(ColorController.getOneColor);
generateRouter.route('/colors/:hex').get(ColorController.getByHex)

generateRouter.route('/patterns').get(PatternController.getAllPatterns);
// generateRouter.route('/patterns/getone').get(PatternController.getByUrl)

generateRouter.route('/designs').get(ImageController.getLast).post(SockController.create)

module.exports = generateRouter;





generateRouter.route('/images').get(ImageController.getAll);
