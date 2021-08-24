'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SimplePokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SimplePokemon.init({
    name: DataTypes.STRING,
    japaneseName: DataTypes.STRING,
    category: DataTypes.STRING,
    baseHP: DataTypes.INTEGER,
    nameWithJapanese: DataTypes.VIRTUAL
  }, {
    sequelize,
    modelName: 'SimplePokemon',
  });
  return SimplePokemon;
};