module.exports = {
  development: {
    username: "postgres",
    password: null,
    database: "sequelize_pokemon",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: null,
    database: "sequelize_pokemon_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    use_env_variable: process.env.DATABASE_URL,
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB_NAME,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: "postgres",
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
};
