'use strict';
const {
  Model
} = require('sequelize');

const bcrypt=require('bcrypt');
const { SALT_ROUNDS } = require('../config/server-config');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Role, { through: models.User_Role });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,50]
      }
    } 
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async function encrypt(user) {
    const encryptedPassword = await bcrypt.hash(user.password, +SALT_ROUNDS);
    user.password = encryptedPassword;
  });
  
  return User;
};