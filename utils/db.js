// Note: this is not used anymore. using db/index.js instead.
const Sequelize = require("sequelize");

const dbDialect = "postgres";
const dbName = process.env.PG_DB_NAME;
const dbUser = process.env.PG_USER || "user";
const dbPass = process.env.PG_PASS;
const dbHost = process.env.PG_HOST || "localhost";
const dbPort = process.env.PG_PORT || 5432;

const dbConnectViaSsl = process.env.PG_SSL_MODE !== "false";
const dbDialectOptions = dbConnectViaSsl
  ? {
      // SSL connection
      // https://github.com/sequelize/sequelize/issues/10015
      // https://stackoverflow.com/questions/58965011/sequelizeconnectionerror-self-signed-certificat
      ssl: {
        require: dbConnectViaSsl,
        rejectUnauthorized: false,
      },
    }
  : {};

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: dbDialect,
  dialectOptions: dbDialectOptions,
  // logging: console.log,                  // Default, displays the first parameter of the log function call
  // logging: (...msg) => console.log(msg), // Displays all log function call parameters
  // logging: false,                        // Disables logging
  pool: {
    max: 10, // default: 5
    min: 0, // default: 0
    idle: 10000, // default: 10000ms
    acquire: 30000, // default: 60000ms
    evict: 1000, // default: 1000ms
  },
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// module.exports = { connectDb };
module.exports = sequelize;
