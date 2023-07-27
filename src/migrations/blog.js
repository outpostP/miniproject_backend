'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blogs', {
      // paranoid: true,
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_category: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      imgBlog: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      videoUrl: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('blogs');
  }
};