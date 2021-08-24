const { DataTypes, Model } = require("sequelize");
// 1. import bcrypt package
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
  class Trainer extends Model {
    static associate(models) {
      // define association here
    }
  }
  Trainer.init(
    {
      // 2a. update username to be unique and non-nullable
      username: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
      // 2b. update password to be unique and non-nullable
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Trainer",
      // 3. add hooks to convert readable password into bcrypt hash before creation and update
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
