'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const now = new Date();
   
    await queryInterface.bulkInsert('Users', [
      { name: 'Jose Rizal', email: 'rizal@library.test',
        createdAt: now, updatedAt: now },
      { name: 'Francisco Balagtas', email: 'balagtas@library.test',
        createdAt: now, updatedAt: now },
      { name: 'John Doe', email: 'doe@library.test',
        createdAt: now, updatedAt: now }
      ]);
    
    const users = await queryInterface.sequelize.query(
      'SELECT id, name FROM "Users";',{ type: Sequelize.QueryTypes.SELECT }
  );
    const idOf = (name) => users.find((u) => u.name === name).id;
    await queryInterface.bulkInsert('Tasks', [
      { title: 'GT1: Learn Node.js', dueDate: new Date('2026-09-01'), completed: true,
        userId: idOf('Jose Rizal'), createdAt: now, updatedAt: now },
      { title: 'GT2: Build Express API', dueDate: new Date('2026-09-05'), completed: true,
        userId: idOf('Jose Rizal'), createdAt: now, updatedAt: now },
      { title: 'GT3: Create REST API', dueDate: new Date('2026-09-10'), completed: false,
        userId: idOf('Francisco Balagtas'), createdAt: now, updatedAt: now },
      { title: 'GT4: Test API Endpoints', dueDate: new Date('2026-09-15'), completed: false,
        userId: idOf('John Doe'), createdAt: now, updatedAt: now }
      ]);  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
