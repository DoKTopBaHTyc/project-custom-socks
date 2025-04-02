const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Sock, {
        foreignKey: 'userId',
        as: 'creations',
      });
      User.hasMany(models.Cart, {
        foreignKey: 'userId',
      });
      User.belongsToMany(models.Sock, {
        foreignKey: 'userId',
        through: 'Like',
        as: 'likes',
      });
      this.hasMany(models.Order, {
        foreignKey: 'userId',
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
