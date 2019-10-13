'use strict';
module.exports = (sequelize, DataTypes) => {
  const Guest = sequelize.define('Guest', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    shop_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    num_invited: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING
    },
    code: {
      allowNull: false,
      type: DataTypes.STRING
    },
    guesttype: {
      allowNull: false,
      type: DataTypes.STRING
    },
    desknumber: {
      allowNull: false,
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
        fields:['shop_name']
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