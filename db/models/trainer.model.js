import sequelize from "sequelize";
import bcrypt from "bcryptjs";
const { DataTypes, Model } = sequelize;

class Trainer extends Model {}

export default async (sequelizeConnection) => {
  Trainer.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize: sequelizeConnection, // We need to pass the connection instance
      underscored: true,
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

  // Not recommended for production level due to destructive operation, but we will use this to demonstrate.
  // For production level, to consider Migration support (advanced topic)
  const synchronizeModel = async () => await Trainer.sync({ force: true });
  await synchronizeModel();

  return Trainer;
};
