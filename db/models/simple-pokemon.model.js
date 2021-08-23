const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class SimplePokemon extends Model {
    static associate(models) {
      // define association here
    }
  }
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
      sequelize,
      // modelName: 'SimplePokemon', // We could set the model name instead of using the Class name
      // freezeTableName: true, // We could skip the pluralization for database naming
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
  return SimplePokemon;
};

// const createPikachu = async () => {
//   const pikachu = {
//     name: "Pikachu",
//     japaneseName: "ピカチュウ",
//     baseHP: 35,
//     category: "Mouse Pokemon",
//     password: "password123",
//   };
//   const created = await SimplePokemon.create(pikachu);

//   console.log("Pikachu was saved to the database!");
//   console.log(created.toJSON()); // The recommended way to log an instance, but do note that this might still log sensitive data stored in database.

//   // attempt to create Pikachu again
//   // const pikachu2 = {
//   //   id: 2,
//   //   ...pikachu,
//   // };
//   // const created2 = await SimplePokemon.create(pikachu2);
//   // console.log(created2.toJSON());
// };
// await createPikachu();

// const findPokemon = async () => {
//   // findAll
//   const foundPokemons = await SimplePokemon.findAll();
//   // console.log(foundPokemons);
//   // find with filter
//   const findPokemonByName = await SimplePokemon.findOne({
//     where: { name: "Pikachu" },
//   });
//   // console.log(findPokemonByName);
// };
// await findPokemon();

// const updatePasswordOfPikachu = async () => {
//   const findPokemonByName = await SimplePokemon.findOne({
//     where: { name: "Pikachu" },
//   });

//   const updatedPokemon = await findPokemonByName.update({
//     password: "newPassword",
//   });
//   console.log("updatedPokemon with new password------", updatedPokemon);
// };
// await updatePasswordOfPikachu();
