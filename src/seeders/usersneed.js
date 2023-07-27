'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: '$2y$10$7XRTFuQMTy1PORJvFG9p5.8XiHRK4QjluV5YsL9dc3J6fFd6.mQfu',
        phone: '0898777312',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com',
        password: '$2y$10$SEOa8fjkejzxqcULuvliheEQ2jTBYUhTmk29ttOjTUGUGjHAzPZNa',
        phone: '0898777315',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'richard_dick',
        email: 'dick@example.com',
        password: '$2y$10$f6l48Z2jlFBTqB8QNcacO.G6ZWRmwJ7YcHIQNOoOXGfNJ1.JOvkQq',
        phone: '0898777715',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
