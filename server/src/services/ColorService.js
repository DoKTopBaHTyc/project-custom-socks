const { Color } = require('../../db/models');

class ColorService {
  static getAllColors() {
    return Color.findAll();
  }

  static getOneColor(id) {
    return Color.findById(id);
  }
}

module.exports = ColorService;
