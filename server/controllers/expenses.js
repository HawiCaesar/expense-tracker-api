const Expense = require("../models").expense;

module.exports = {
  create(request, response) {
    return Expense.create({
      name: request.body.name,
      amount: +request.body.amount,
      expenseCategoryId: +request.params.expenseCategoryId
    })
      .then(expense => response.status(201).send(expense))
      .catch(error => response.status(400).send(error));
  },
  update(request, response) {
    return Expense.findOne({
      where: {
        id: request.params.expenseId,
        expenseCategoryId: request.params.expenseCategoryId
      }
    })
      .then(expense => {
        if (!expense) {
          return response.status(404).send({
            message: "Expense not found"
          });
        }

        return expense
          .update(request.body, {
            fields: Object.keys(request.body)
          })
          .then(updatedExpense => response.status(200).send(updatedExpense))
          .catch(error => response.status(500).send(error));
      })
      .catch(error => response.status(400).send(error));
  },
  destroy(request, response) {
    return Expense.findOne({
      where: {
        id: request.params.expenseId,
        expenseCategoryId: request.params.expenseCategoryId
      }
    })
      .then(expense => {
        if (!expense) {
          return response.status(404).send({
            message: "Expense not found"
          });
        }
        return expense
          .destroy()
          .then(() => response.status(204).send())
          .catch(error => response.status(500).send(error));
      })
      .catch(error => response.status(400).send({ message: `${error}` }));
  }
};
