const FavoriteService = require('../services/FavoritesService');

class FavoriteController {
  static async getFavorites(req, res) {
    try {
      const { id } = res.locals.user;
      const { likes } = await FavoriteService.allFavoriteSocks(Number(id));
      // console.log(likes);

      res.status(200).json(likes);
    } catch (error) {
      console.error(error);

      res.status(500).json('Ошибка в FavoriteController.js', error.message);
    }
  }

  static async delete(req, res) {
    try {
      const userId = res.locals.user.id;
      const { id } = req.params;

      const deletedCount = await FavoriteService.delete(userId, id);

      if (deletedCount === 0) {
        return res.status(404).json({});
      }

      res.status(200).json({
        success: true,
        message: 'Удалено из избранного',
      });
    } catch (error) {
      console.error('Ошибка при удалении из избранного:', error);

      res.status(500).json({
        success: false,
        message: 'Ошибка при удалении из избранного',
        error: error.message,
      });
    }
  }

  static async addToCart(req, res) {
    try {
      const userId = Number(res.locals.user.id);
      const sockId = Number(res.params.id);
      const resp = await FavoriteService.addInCart(userId, sockId);
      res.status(200).json(resp);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
}

module.exports = FavoriteController;
