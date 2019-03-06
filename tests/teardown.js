const ExpenseCategory = require("../server/models").expenseCategory;
const User = require("../server/models").user;

module.exports = {
  destroyExpenseCategories() {
    return ExpenseCategory.destroy({
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  },
  destroyUsers() {
    return User.destroy({
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};
