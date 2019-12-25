module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Mary Jane',
          email: 'mary-jane@email.com',
          age: 23,
          weight: 56.5,
          height: 163,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'John Doe',
          email: 'john-doe@email.com',
          age: 27,
          weight: 75.5,
          height: 170,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'João da Silva',
          email: 'joao-da-silva@email.com',
          age: 32,
          weight: 89.2,
          height: 185,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Amanda Pontes',
          email: 'amanda-pontes@email.com',
          age: 18,
          weight: 50.9,
          height: 167,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Juliana Marques',
          email: 'juliana-marques@email.com',
          age: 45,
          weight: 78.4,
          height: 177,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('students', null, {});
  },
};
