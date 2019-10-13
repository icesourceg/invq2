'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('Guests',
      ['code'],
      {
        indexName: 'code',
        indicesType: 'INDEX'
      }
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('Guests', ['code'])
  }
};
