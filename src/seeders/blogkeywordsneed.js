'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('blogKeywords', [
    {
      id_blog: 1,
      keywordName: 'abc'
    },
    {
      id_blog: 1,
      keywordName: 'cba'
    },
    {
      id_blog: 2,
      keywordName: 'poi'
    },
    {
      id_blog: 2,
      keywordName: 'ke'
    },
    {
      id_blog: 3,
      keywordName: '123'
    },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('blogKeywords', null, {});
  }
};
