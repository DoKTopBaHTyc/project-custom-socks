const { Image } = require('../../db/models');
const fs = require('fs');
const path = require('path');
const UPLOAD_DIR = path.join(__dirname, '../../public/loadedImages');

class ImageService {
  static getAll() {
    return Image.findAll();
  }

  static getLast() {
    return Image.findOne({
      order: [['id', 'DESC']],
    });
  }

  static async createImage(imageData) {
    try {
      // Создаем папку, если не существует
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
      }

      // Сохраняем файл на диск
      const filePath = path.join(UPLOAD_DIR, imageData.filename);
      await fs.promises.writeFile(filePath, imageData.data);

      return filePath.match(/\/loadedImages\/saved-image-.*/g)[0];
    } catch (error) {
      console.error('ImageService.createImage error:', error);
      throw error;
    }
  }
}

module.exports = ImageService;
