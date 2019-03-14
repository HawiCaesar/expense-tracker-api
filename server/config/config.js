require("dotenv").config();

const config = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
    operatorsAliases: false
  },
  test: {
    username: process.env.TEST_DATABASE_USERNAME,
    password: process.env.TEST_DATABASE_PASSWORD,
    database: process.env.TEST_DATABASE,
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
    operatorsAliases: false
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    operatorsAliases: false
  }
};

module.exports = config;
