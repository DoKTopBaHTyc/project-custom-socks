'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sock extends Model {
    static associate(models) {
      this.belongsTo(models.Color, {
        foreignKey: 'colorId',
      });
      this.belongsTo(models.Pattern, {
        foreignKey: 'patternId',
      });
      // this.belongsTo(models.Image, {
      //   foreignKey: 'imageId',
      // });
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'creator',
      });
      this.belongsToMany(models.User, {
        through: 'Like',
        foreignKey: 'sockId',
        as: 'users',
      });
    }
  }
  Sock.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      colorId: DataTypes.INTEGER,
      patternId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      desingURL: {
        type: DataTypes.TEXT('long'), // Изменено для хранения больших base64 изображений
        allowNull: true // Разрешаем null, если изображение не загружено
      },
    },
    {
      sequelize,
      modelName: 'Sock',
    },
  );
  return Sock;
};
