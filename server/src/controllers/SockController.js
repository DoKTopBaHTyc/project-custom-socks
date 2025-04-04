const SockService = require('../services/SockService');

class SockController {
  static async create(req, res) {
    try {
      const { name, price, colorId, patternId, userId, designUrl } = req.body;
      const sock = await SockService.create(
        name,
        Number(price),
        Number(colorId),
        Number(patternId),
        Number(userId),
        designUrl,
      );
      console.log(sock);
      return res.status(201).json(sock);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка создания дизайна' });
    }
  }
}

module.exports = SockController;
