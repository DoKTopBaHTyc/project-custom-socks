const { Color } = require('../../db/models');

class ColorService {
  static getAllColors() {
    return Color.findAll();
  }

  static getOneColor(id) {
    return Color.findById(id);
  }

  static getByHex(hex) {
    return Color.findOne({
      where: {hex}
    })
  }
}

module.exports = ColorService;
