'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Socks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      colorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Colors',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      patternId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Patterns',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      // imageId: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'Images',
      //     key: 'id',
      //   },
      //   onDelete: 'CASCADE',
      //   allowNull: false,
      // },
      desingURL: {
        type: Sequelize.TEXT('long'), 
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Socks');
  },
};
