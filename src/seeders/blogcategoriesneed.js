'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('blogCategories', [
      {
        category:'General',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category:'Sport',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category:'Economy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category:'Politics',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category:'Business',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category:'Fiction',
        createdAt: new Date(),
        updatedAt: new Date(),
      } 
    ]) 
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('blogCategories', null, {});
  }
};
