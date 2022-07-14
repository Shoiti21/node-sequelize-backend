'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: "user_id", as: "user"});
    }
  }
  Address.init({
    user_id: DataTypes.INTEGER,
    zipcode: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    district: DataTypes.STRING,
    street: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};