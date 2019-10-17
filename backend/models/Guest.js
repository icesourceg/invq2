'use strict';
module.exports = (sequelize, DataTypes) => {
  const Guest = sequelize.define('Guest', {
    name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    address: {
      allowNull: true,
      type: DataTypes.STRING
    },
    num_invited: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    city: {
      allowNull: true,
      type: DataTypes.STRING
    },
    code: {
      allowNull: false,
      type: DataTypes.STRING
    },
    guesttype: {
      allowNull: true,
      type: DataTypes.STRING
    },
    desknumber: {
      allowNull: true,
      type: DataTypes.STRING
    },
    regnumber: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    indexes:[
      {
        unique: false,
        fields:['code']
      },
      {
        unique: false,
        fields:['name']
      },
      {
        unique: false,
        fields:['address']
      }
      
     ],
    underscored: true,
  });
  Guest.associate = function(models) {
    // associations can be defined here
    Guest.hasOne(models.Guesthistory);
  };
  return Guest;
};