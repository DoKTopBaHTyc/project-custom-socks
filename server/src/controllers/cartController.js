const cartService = require('../services/cartService');

class CartController {
  static async getAllCartItems(req, res) {
    try {
      const userId = res.locals.user.id;
      const cartItems = await cartService.getAllCartItems(userId);
      if (!cartItems || cartItems.length === 0) {
        return res.status(404).json({ error: 'Корзина пуста' });
      }
      res.status(200).json(cartItems);
    } catch (error) {
      console.error('Ошибка при получении корзины:', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }

  static async patchOrderStatus(req, res) {
    try {
      const userId = res.locals.user.id;
      const updatedCartItem = await cartService.patchOrderStatus(userId);
      res.status(200).json(updatedCartItem);
    } catch (error) {
      console.error('Ошибка при обновлении статуса заказа:', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }

  static async patchCartItem(req, res) {
    try {
      const { id } = req.params;
      const userId = res.locals.user.id;
      const { quantity } = req.body;
      const updatedCartItem = await cartService.patchCartItem(userId, id, quantity);
      res.status(200).json(updatedCartItem);
    } catch (error) {
      console.error('Ошибка при обновлении количества', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }

  static async deleteCartItem(req, res) {
    try {
      const { id } = req.params;
      const userId = res.locals.user.id;
      await cartService.deleteCartItem(userId, id);
      res.sendStatus(204);
    } catch (error) {
      console.error('Ошибка при удалении элемента корзины:', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }

  static async addToFavorites(req, res) {
    try {
      const { id } = req.params;
      const userId = res.locals.user.id;
      const favorite = await cartService.addToFavorites(userId, id);
      res.status(201).json(favorite);
    } catch (error) {
      console.error('Ошибка при добавлении в избранное:', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }
}

module.exports = CartController;
