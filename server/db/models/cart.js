'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: 'userId',
      });      
      this.belongsTo(models.Sock, {
        foreignKey: 'sockId',
      });
      this.belongsTo(models.Order, {
        foreignKey: 'orderId',
      });
    }
  }
  Cart.init(
    {
      quantity: DataTypes.INTEGER,
      subTotal: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      sockId: DataTypes.INTEGER,
      orderId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Cart',
    },
  );
  return Cart;
};
