"use strict";
module.exports = (sequelize, DataTypes) => {
  const expenseCategory = sequelize.define(
    "expenseCategory",
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {}
  );
  expenseCategory.associate = models => {
    // associations can be defined here
    expenseCategory.hasMany(models.expense, {
      foreignKey: "expenseCategoryId",
      as: "expenses"
    });

    expenseCategory.belongsTo(models.expenseCategory, {
      foreignKey: "ownerId",
      onDelete: "CASCADE"
    });
  };
  return expenseCategory;
};
