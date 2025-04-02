const bcrypt = require('bcrypt');
const { User } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Добавляем пользователей
    await User.bulkCreate([
      {
        id: 1,
        name: 'Denis',
        email: 'Denis@mail.com',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Lisa',
        email: 'Lisa@mail.com',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Nikita',
        email: 'Nikita@mail.com',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: 'Nastya',
        email: 'Nastya@mail.com',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
