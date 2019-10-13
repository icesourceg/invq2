'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('Guests',
      ['shop_name'],
      {
        indexName: 'shop_name',
        indicesType: 'INDEX'
      }
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('Guests', ['shop_name'])
  }
};
