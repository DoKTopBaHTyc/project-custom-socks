const ColorService = require('../services/ColorService');

class ColorController {
  static async getAllColors(req, res) {
    try {
      const colors = await ColorService.getAllColors();
      return res.status(200).json(colors);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving colors', error });
    }
  }

  static async getOneColor(req, res) {
    try {
      const { id } = req.params;
      const color = await ColorService.getOneColor(id);
      if (!color) {
        return res.status(404).json({ message: 'Color not found' });
      }
      return res.status(200).json(color);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving color', error });
    }
  }
}

module.exports = ColorController;
