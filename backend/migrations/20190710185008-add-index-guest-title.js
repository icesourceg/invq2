'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('Guests',
      ['address'],
      {
        indexName: 'address',
        indicesType: 'INDEX'
      }
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('Guests', ['address'])
  }
};
