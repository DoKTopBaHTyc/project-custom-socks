const { Sock, User, Like, Cart } = require('../../db/models');

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
        where: { userId, id },
      });
      return await deletedCount.destroy();
    } catch (error) {
      console.error('Ошибка при удалении из избранного:', error);
      throw error;
    }
  }

  static async addInCart({ userId, sockId }) {
    const findSock = await Sock.findByPk(sockId);
    if (!findSock) {
      throw new Error('Носок не найден')
    }

      const item = await Cart.findOrCreate({
        
        quantity: 1,
        subTotal: findSock.price,
        userId,
        sockId,
        orderId: 1,
    })
  return item
    
  }

  static create(userId, sockId) {
    return Like.create({userId, sockId})
  }
}

module.exports = FavoriteService;
