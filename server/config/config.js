const config = {
  development: {
    username: "brianhawi",
    password: null,
    database: "expensesdb",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
    operatorsAliases: false
  },
  test: {
    username: "brianhawi",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    port: 5432,
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
