const { where } = require('sequelize');
const { Sock, User, Like, Cart, Order } = require('../../db/models');

class FavoriteService {
  static async allUsers() {
    return User.findAll();
  }

  static async allFavoriteSocks(id) {
    try {
      const favorite = User.findOne({
        where: { id },
        include: {
          model: Sock,
          as: 'likes',
        },
      });
      return favorite;
    } catch (error) {
      console.error('Ошибка в allFavoriteService:', error);
      throw error;
    }
  }

  static async delete(userId, id) {
    try {
      const deletedCount = await Like.findOne({
        where: { userId, sockId: id },
      });
      if (!deletedCount) {
        throw new Error('Запись не найдена');
      }
      return await deletedCount.destroy();
    } catch (error) {
      console.error('Ошибка при удалении из избранного:', error);
      throw error;
    }
  }

  static async addInCart(userId, sockId) {
    const findSock = await Sock.findByPk(sockId);

    const userOrders = await Order.findAll({
      where: { userId },
    });
    let orderId = userOrders[userOrders.length - 1].id;
    console.log(orderId, '2');

    if (userOrders[userOrders.length - 1].isOrdered) {
      if (!findSock) {
        throw new Error('Носок не найден');
      }

      const newOrder = await Order.create({
        userId,
        isOrdered: false,
      });
      orderId = newOrder.id;
      console.log(orderId, '3');
    }

    const [item, created] = await Cart.findOrCreate({
      where: { sockId, userId },
      defaults: {
        quantity: 1,
        subTotal: findSock.price,
        userId,
        sockId,
        orderId,
      },
    });

    return item;
  }

  static create(userId, sockId) {
    return Like.create({userId, sockId})
  }
}

module.exports = FavoriteService;
