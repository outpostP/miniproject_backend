'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
				allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
				allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
				allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      imgProfile: {
        type: Sequelize.STRING
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};