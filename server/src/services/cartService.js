const { Cart, Sock, Order, Likes } = require('../../db/models');

class cartService {
  static async getAllCartItems(userId) {
    const cartItems = await Cart.findAll({
      where: { userId, '$Order.isOrdered$': false },
      include: [
        {
          model: Sock,
          attributes: ['name', 'price', 'desingURL'],
        },
        {
          model: Order,
          attributes: ['isOrdered'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return cartItems;
  }

  static async patchOrderStatus(userId) {
    const order = await Order.findOne({ where: { userId } });
    order.isOrdered = true;
    await order.save();
    return order;
  }

  static async patchCartItem(userId, id, quantity) {
    const cartItem = await Cart.findOne({
      where: { userId, id },
      include: [
        {
          model: Sock,
          attributes: ['price'],
        },
      ],
    });
    cartItem.quantity = quantity;
    cartItem.subTotal = cartItem.Sock.price * quantity;
    await cartItem.save();
    return cartItem;
  }

  static async deleteCartItem(userId, id) {
    const cartItem = await Cart.findOne({
      where: { id, userId },
    });
    if (!cartItem) {
      throw new Error('Элемент корзины не найден');
    }

    await cartItem.destroy();
  }

  static async addToFavorites(userId, sockId) {
    const favorite = await Likes.create({ userId, sockId });
    return favorite;
  }
}

module.exports = cartService;
