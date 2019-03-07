module.exports = {
  validateExpenseCategories(request, response, next) {
    if (!request.body.name) {
      return response
        .status(400)
        .send({ message: "Expense category name is required" });
    }
    next();
  },
  validateExpenses(request, response, next) {
    if (!request.body.name) {
      return response.status(400).send({ message: "Expense name is required" });
    }

    if (!request.body.amount) {
      return response
        .status(400)
        .send({ message: "Expense amount is required" });
    }

    let expenseAmount = parseInt(request.body.amount, 10);

    if (isNaN(expenseAmount)) {
      return response
        .status(400)
        .send({ message: "Expense amount must be a number" });
    }

    next();
  }
};
