const Op = require("sequelize").Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};

const config = {
  development: {
    username: "brianhawi",
    password: null,
    database: "expensesdb",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
    operatorsAliases: operatorsAliases
  },
  test: {
    username: "brianhawi",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
    operatorsAliases: operatorsAliases
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
