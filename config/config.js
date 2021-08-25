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
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    // logging: console.log,                  // Default, displays the first parameter of the log function call
    // logging: (...msg) => console.log(msg), // Displays all log function call parameters
    // logging: false,                        // Disables logging
    pool: {
      max: 10, // default: 5
      min: 0, // default: 0
      idle: 10000, // default: 10000ms
      acquire: 30000, // default: 60000ms
      evict: 1000 // default: 1000ms
    }
  },
};
