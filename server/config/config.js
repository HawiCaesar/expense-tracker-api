require("dotenv").config();

const config = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
    operatorsAliases: false,
    use_env_variable: "DATABASE_URL"
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
  staging: {
    dialect: "postgres",
    operatorsAliases: false
  },
  production: {
    username: "brianhawi",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: false
  }
};

module.exports = config;
