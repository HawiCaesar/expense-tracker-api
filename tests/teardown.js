const ExpenseCategory = require("../server/models").expenseCategory;
const Expense = require("../server/models").expense;

module.exports = {
  destroyExpenseCategories() {
    return ExpenseCategory.destroy({
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  },
  destroyExpenses() {
    return Expense.destroy({
      where: {},
      truncate: true
    });
  }
};
