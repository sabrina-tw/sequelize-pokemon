import sequelizeConnection from "../../utils/db.js"; // Reference to the database connection instance
import { DataTypes, Model } from "sequelize";

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
const synchronizeModel = async () => await SimplePokemon.sync({ force: true });
await synchronizeModel();

export default SimplePokemon;
