'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('blogs', [
      {
        title: 'aaaaa',
        content: 'aaaaaaaa',
        imgBlog: 'aaaaaa',
        id_user: 1,
        id_category: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'kpoim',
        content: '8097u',
        imgBlog: '325gt',
        id_user: 1,
        id_category: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'aa234a',
        content: 'er532',
        imgBlog: '213a',
        id_user: 1,
        id_category: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('blogs', null, {});
  }
};
