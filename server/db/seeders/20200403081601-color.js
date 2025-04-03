'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Colors',
      [
        {
          hex: '#ff6bd8', 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          hex: '#dc97fc', 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          hex: '#07d7f7',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          hex: '#f7cf07', 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          hex: '#aff707', 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Colors', null, {});
  },
};
