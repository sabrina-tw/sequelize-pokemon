import sequelizeConnection from "../../utils/db.js"; // Reference to the database connection instance
import sequelize from "sequelize";
import bcrypt from "bcryptjs";
const { DataTypes, Model } = sequelize;

class SimplePokemon extends Model {}

export default async (sequelizeConnection) => {
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
      password: {
        type: DataTypes.STRING, // to demonstrate bcrypt hashing
        // set(value) {
        //   const hashedPassword = SimplePokemon.hashPassword(value);
        //   this.setDataValue("password", hashedPassword);
        // },
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
      // instanceMethods: {
      //   hashPassword(password) {
      //     return bcrypt.hash(password, 10);
      //   },
      //   async validPassword(password) {
      //     return await bcrypt.compare(password, this.password);
      //   },
      // },
      hooks: {
        beforeCreate: async (pokemon) => {
          if (pokemon.password) {
            const salt = await bcrypt.genSaltSync(10);
            pokemon.password = bcrypt.hashSync(pokemon.password, salt);
          }
        },
        beforeUpdate: async (pokemon) => {
          if (pokemon.password) {
            const salt = await bcrypt.genSaltSync(10);
            pokemon.password = bcrypt.hashSync(pokemon.password, salt);
          }
        },
      },
    }
  );

  // Not recommended for production level due to destructive operation, but we will use this to demonstrate.
  // For production level, to consider Migration support (advanced topic)
  const synchronizeModel = async () =>
    await SimplePokemon.sync({ force: true });
  await synchronizeModel();

  const createPikachu = async () => {
    const pikachu = {
      name: "Pikachu",
      japaneseName: "ピカチュウ",
      baseHP: 35,
      category: "Mouse Pokemon",
      password: "password123",
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
  await createPikachu();

  const findPokemon = async () => {
    // findAll
    const foundPokemons = await SimplePokemon.findAll();
    // console.log(foundPokemons);
    // find with filter
    const findPokemonByName = await SimplePokemon.findOne({
      where: { name: "Pikachu" },
    });
    // console.log(findPokemonByName);
  };
  await findPokemon();

  const updatePasswordOfPikachu = async () => {
    const findPokemonByName = await SimplePokemon.findOne({
      where: { name: "Pikachu" },
    });

    const updatedPokemon = await findPokemonByName.update({
      password: "newPassword",
    });
    console.log("updatedPokemon with new password------", updatedPokemon);
  };
  await updatePasswordOfPikachu();

  return SimplePokemon;
};
