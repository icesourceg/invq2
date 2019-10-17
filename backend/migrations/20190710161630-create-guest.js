'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Guests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      num_invited: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      city: {
        allowNull: true,
        type: Sequelize.STRING
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING
      },
      guesttype: {
        allowNull: false,
        type: Sequelize.STRING
      },
      desknumber: {
        allowNull: true,
        type: Sequelize.STRING
      },
      regnumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Guests');
  }
};