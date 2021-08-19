import sequelizeConnection from "../../utils/db.js"; // Reference to the database connection instance
import sequelize from "sequelize";
const { DataTypes, Model } = sequelize;

class SimplePokemon extends Model {}

SimplePokemon.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    japaneseName: {
      type: DataTypes.STRING,
    },
    baseHP: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.STRING,
    },
    nameWithJapanese: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.name} ${this.japaneseName}`;
      },
      set(value) {
        throw new Error("Do not try to set the `nameWithJapanese` value!");
      },
    },
  },
  {
    sequelize: sequelizeConnection, // We need to pass the connection instance
    // modelName: 'SimplePokemon', // We could set the model name instead of using the Class name
    freezeTableName: true, // We could skip the pluralization for database naming
    tableName: "Simple_Pokemon", // We could lock the name of the database table directly
    indexes: [
      {
        unique: true,
        fields: ["name"],
      },
    ],
    underscored: true,
  }
);

// Not recommended for production level due to destructive operation, but we will use this to demonstrate.
// For production level, to consider Migration support (advanced topic)
const synchronizeModel = async () => {
  await SimplePokemon.sync({ force: true });

  // create Pikachu
  const pikachu = {
    name: "Pikachu",
    japaneseName: "ピカチュウ",
    baseHP: 35,
    category: "Mouse Pokemon",
  };
  const created = await SimplePokemon.create(pikachu);

  console.log("Pikachu was saved to the database!");
  console.log(created.toJSON()); // The recommended way to log an instance, but do note that this might still log sensitive data stored in database.

  // attempt to create Pikachu again
  // const pikachu2 = {
  //   id: 2,
  //   ...pikachu,
  // };
  // const created2 = await SimplePokemon.create(pikachu2);
  // console.log(created2.toJSON());
};
await synchronizeModel();

export default SimplePokemon;
