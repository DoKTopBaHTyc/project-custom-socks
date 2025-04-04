const PatternService = require('../services/PatternService');

class PatternController {
  static async getAllPatterns(req, res) {
    try {
      const patterns = await PatternService.getAllPatterns();
      return res.status(200).json(patterns);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving patterns', error });
    }
  }

    static async getByUrl(req, res) {
      try {
        const {url} = req.body
        const color = await PatternService.getByUrl(url)
        return res.status(200).json(color)
      } catch (error) {
        return res.status(500).json({ message: 'Ошибка получения цвета', error });
      }
    }
}

module.exports = PatternController;
