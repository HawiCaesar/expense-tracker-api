const initialExpenseCategory = {
  name: "Miscellaneous",
  description: "other expenses that are not categorized"
};

const validExpenseCategory = {
  name: "Food & Upkeep",
  description: "Food & upkeep expenses"
};

const anotherExpenseCategory = {
  name: "Clothing",
  description: "Clothing expenses"
};

const updateExpenseCategory = {
  name: "Food Items",
  description: "Food expenses only"
};

const validExpense = {
  name: "Fruits & vegetables",
  amount: 500
};

const anotherExpense = {
  name: "Bread",
  amount: 70
};

updateExpense = {
  amount: 50
};

invalidExpense = {
  name: "Scones",
  amount: "an amount"
};

module.exports = {
  initialExpenseCategory,
  validExpenseCategory,
  updateExpenseCategory,
  anotherExpenseCategory,
  validExpense,
  anotherExpense,
  updateExpense,
  invalidExpense
};
