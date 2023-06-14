'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGameBiodata extends Model {
    static associate(models) {
      UserGameBiodata.belongsTo(models.UserGame, { foreignKey: 'userGameId' });
    }
  }
  UserGameBiodata.init({
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    sex: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    userGameId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserGameBiodata',
  });
  return UserGameBiodata;
};
