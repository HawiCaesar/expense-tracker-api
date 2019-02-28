'use strict';
module.exports = (sequelize, DataTypes) => {
  const expenseCategory = sequelize.define('expenseCategory', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  expenseCategory.associate = function(models) {
    // associations can be defined here
    expenseCategory.hasMany(models.expense, {
      foreignKey: 'expenseCategoryId',
      as: 'expenses'
    })
  };
  return expenseCategory;
};