const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Добавляем пользователей
    const users = [
      {
        name: 'Denis',
        email: 'Denis@mail.com',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lisa',
        email: 'Lisa@mail.com',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Nikita',
        email: 'Nikita@mail.com',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
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
      { hex: '#FF5733', createdAt: new Date(), updatedAt: new Date() },
      { hex: '#33FF57', createdAt: new Date(), updatedAt: new Date() },
      { hex: '#3357FF', createdAt: new Date(), updatedAt: new Date() },
    ];
    await queryInterface.bulkInsert('Colors', colors);

    // Добавляем паттерны
    const patterns = [
      {
        url: 'https://example.com/pattern1.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        url: 'https://example.com/pattern2.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Patterns', patterns);

    // Добавляем носки
    const socks = [
      {
        name: 'Red Socks',
        price: 500,
        colorId: 1,
        patternId: 1,
        userId: 1,
        desingURL: 'https://google.com/',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Black Socks',
        price: 500,
        colorId: 2,
        patternId: 2,
        userId: 1,
        desingURL: 'https://google.com/',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Green Socks',
        price: 600,
        colorId: 2,
        patternId: 2,
        userId: 2,
        desingURL: 'https://example.com/design2.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Socks', socks);

    // Добавляем заказы
    const orders = [
      {
        userId: 1,
        isOrdered: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
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
        userId: 1,
        sockId: 1,
        orderId: 1,
        quantity: 2,
        subTotal: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        sockId: 2,
        orderId: 1,
        quantity: 1,
        subTotal: 600,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        sockId: 3,
        orderId: 1,
        quantity: 1,
        subTotal: 600,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Carts', cartItems);

    const likes = [
      {
        userId: 1,
        sockId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        sockId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        sockId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        sockId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        sockId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Likes', likes)

    // Добавляем лайки
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Likes', null, {});
    await queryInterface.bulkDelete('Carts', null, {});
    await queryInterface.bulkDelete('Orders', null, {});
    await queryInterface.bulkDelete('Socks', null, {});
    await queryInterface.bulkDelete('Patterns', null, {});
    await queryInterface.bulkDelete('Colors', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
