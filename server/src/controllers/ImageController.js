const ImageService = require('../services/ImageService');

class ImageController {
  static async getAll(req, res) {
    try {
      const images = await ImageService.getAll();
      res.status(200).json(images);
    } catch (error) {
      console.error(error.message);
      res.sendStatus(500);
    }
  }

  static async uploadImage(req, res) {
    try {
      console.log(req.file);
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      const { buffer, originalname, mimetype } = req.file;
      const imageData = {
        filename: originalname,
        originalName: originalname,
        mimeType: mimetype,
        size: buffer.length,
        data: buffer, // Сохраняем бинарные данные
      };
      const imagePath = await ImageService.createImage(imageData);

      return res.status(201).json({
        url: imagePath
      });
    } catch (error) {
      console.error('Image upload error:', error);
      return res.status(500).json({ error: 'Failed to upload image' });
    }
  }

  static async getLast(req, res) {
    try {
      const lastDesign = await ImageService.getLast();
      if (lastDesign) return res.status(200).json(lastDesign);
      return res.status(200).json({ id: 0 });
    } catch (error) {
      console.error('Image upload error:', error);
      return res.status(500).json({ error: 'Ошибка получения последнего design' });
    }
  }
}

module.exports = ImageController;
