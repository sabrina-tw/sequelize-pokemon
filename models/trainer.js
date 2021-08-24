"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class Trainer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trainer.init(
    {
      username: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Trainer",
      hooks: {
        beforeCreate: async (trainer) => {
          if (trainer.password) {
            const salt = await bcrypt.genSaltSync(10);
            trainer.password = bcrypt.hashSync(trainer.password, salt);
          }
        },
        beforeUpdate: async (trainer) => {
          if (trainer.password) {
            const salt = await bcrypt.genSaltSync(10);
            trainer.password = bcrypt.hashSync(trainer.password, salt);
          }
        },
      },
    }
  );
  return Trainer;
};
