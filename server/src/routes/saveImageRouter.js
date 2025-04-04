const saveImageRouter = require('express').Router();
const multer = require('multer');
const ImageController = require('../controllers/ImageController');

const upload = multer({
    storage: multer.memoryStorage(), // Хранение в памяти для последующей обработки
    limits: { fileSize: 6 * 1024 * 1024 } // 10MB лимит
  });

saveImageRouter.route('/').post(upload.single('image'), ImageController.uploadImage);


module.exports = saveImageRouter;