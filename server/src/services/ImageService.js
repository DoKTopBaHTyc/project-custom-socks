const { Image } = require('../../db/models')

class ImageService {
    static getAll() {
        return Image.findAll()
    }
}

module.exports = ImageService