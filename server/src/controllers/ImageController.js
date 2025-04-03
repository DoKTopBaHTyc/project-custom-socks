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
}

module.exports = ImageController;
