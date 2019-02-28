'use strict';
module.exports = (sequelize, DataTypes) => {
  const expense = sequelize.define('expense', {
    name: DataTypes.STRING,
    amount: DataTypes.STRING
  }, {});
  expense.associate = models => {
    // associations can be defined here
    expense.belongsTo(models.expenseCategory, {
      foreignKey: 'expenseCategoryId',
      onDelete: 'CASCADE'
    });
  };
  return expense;
};