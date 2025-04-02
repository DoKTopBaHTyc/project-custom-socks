const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Добавляем пользователей
    const users = [
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
    ];
    await queryInterface.bulkInsert('Users', users);

    // Добавляем цвета
    const colors = [
      { id: 1, hex: '#FF5733', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, hex: '#33FF57', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, hex: '#3357FF', createdAt: new Date(), updatedAt: new Date() },
    ];
    await queryInterface.bulkInsert('Colors', colors);

    // Добавляем паттерны
    const patterns = [
      { id: 1, url: 'https://example.com/pattern1.png', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, url: 'https://example.com/pattern2.png', createdAt: new Date(), updatedAt: new Date() },
    ];
    await queryInterface.bulkInsert('Patterns', patterns);

    // Добавляем изображения
    const images = [
      { id: 1, url: 'https://example.com/sock1.png', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, url: 'https://example.com/sock2.png', createdAt: new Date(), updatedAt: new Date() },
    ];
    await queryInterface.bulkInsert('Images', images);

    // Добавляем носки
    const socks = [
      {
        id: 1,
        name: 'Red Socks',
        price: 500,
        colorId: 1,
        patternId: 1,
        userId: 1,
        imageId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Green Socks',
        price: 600,
        colorId: 2,
        patternId: 2,
        userId: 2,
        imageId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Socks', socks);

    // Добавляем заказы
    const orders = [
      {
        id: 1,
        userId: 1,
        isOrdered: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 2,
        isOrdered: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Orders', orders);

    // Добавляем товары в корзину
    const cartItems = [
      {
        id: 1,
        userId: 1,
        sockId: 1,
        orderId: 1,
        quantity: 2,
        subTotal: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 2,
        sockId: 2,
        orderId: 2,
        quantity: 1,
        subTotal: 600,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Carts', cartItems);

    // Добавляем лайки
    const likes = [
      { id: 1, userId: 1, sockId: 2, createdAt: new Date(), updatedAt: new Date() }, // Денис лайкнул зелёные носки
      { id: 2, userId: 2, sockId: 1, createdAt: new Date(), updatedAt: new Date() }, // Лиса лайкнула красные носки
      { id: 3, userId: 3, sockId: 1, createdAt: new Date(), updatedAt: new Date() }, // Никита тоже лайкнул красные
      { id: 4, userId: 4, sockId: 2, createdAt: new Date(), updatedAt: new Date() }, // Настя лайкнула зелёные
    ];
    await queryInterface.bulkInsert('Likes', likes);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Likes', null, {});
    await queryInterface.bulkDelete('Carts', null, {});
    await queryInterface.bulkDelete('Orders', null, {});
    await queryInterface.bulkDelete('Socks', null, {});
    await queryInterface.bulkDelete('Images', null, {});
    await queryInterface.bulkDelete('Patterns', null, {});
    await queryInterface.bulkDelete('Colors', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
