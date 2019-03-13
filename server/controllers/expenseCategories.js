const ExpenseCategory = require("../models").expenseCategory;
const Expense = require("../models").expense;
const sequelize = require("sequelize");

module.exports = {
  create(request, response) {
    return ExpenseCategory.create({
      name: request.body.name,
      description: request.body.description,
      ownerId: request.user.id
    })
      .then(category => response.status(201).send(category))
      .catch(error => response.status(400).send({ message: `${error}` }));
  },
  list(request, response) {
    return ExpenseCategory.findAll({
      where: {
        ownerId: request.user.id
      },
      include: [
        {
          model: Expense,
          as: "expenses"
        }
      ]
    })
      .then(categories => response.status(200).send(categories))
      .catch(error => response.status(400).send({ message: `${error}` }));
  },
  retrieve(request, response) {
    return ExpenseCategory.findOne({
      where: {
        id: request.params.expenseCategoryId,
        ownerId: request.user.id
      },
      include: [
        {
          model: Expense,
          as: "expenses"
        }
      ]
    })
      .then(category => {
        if (!category) {
          return response.status(404).send({
            message: "Expense category not found"
          });
        }
        return Expense.findOne({
          where: {
            expenseCategoryId: request.params.expenseCategoryId
          },
          attributes: [
            "expenseCategoryId",
            [sequelize.fn("sum", sequelize.col("amount")), "total"]
          ],
          group: ["expense.expenseCategoryId"]
        })
          .then(summedExpenses => {
            let totalExpenses = 0;
            if (summedExpenses !== null) {
              totalExpenses = +summedExpenses.dataValues.total;
            }
            return response.status(200).send({
              id: category.id,
              name: category.name,
              description: category.description,
              updatedAt: category.updatedAt,
              createdAt: category.createdAt,
              expensesTotal: totalExpenses,
              expenses: category.expenses
            });
          })
          .catch(error => response.status(400).send({ message: `${error}` }));
      })
      .catch(error => response.status(400).send({ message: `${error}` }));
  },
  update(request, response) {
    return ExpenseCategory.findOne({
      where: {
        id: request.params.expenseCategoryId,
        ownerId: request.user.id
      },
      include: [
        {
          model: Expense,
          as: "expenses"
        }
      ]
    })
      .then(category => {
        return category
          .update({
            name: request.body.name || category.name,
            description: request.body.description || category.description
          })
          .then(() => response.status(200).send(category))
          .catch(error => response.status(500).send({ message: `${error}` }));
      })
      .catch(error =>
        response.status(400).send({
          message: "Expense category not found"
        })
      );
  },
  destroy(request, response) {
    return ExpenseCategory.findOne({
      where: {
        id: request.params.expenseCategoryId,
        ownerId: request.user.id
      }
    }).then(category => {
      if (!category) {
        return response.status(404).send({
          message: "Expense category not found"
        });
      }
      return category
        .destroy()
        .then(() => response.status(204).send())
        .catch(error => response.status(400).send({ message: `${error}` }));
    });
  },
  retrieveSummary(request, response) {
    return ExpenseCategory.findOne({
      where: {
        id: request.params.expenseCategoryId,
        ownerId: request.user.id
      }
    })
      .then(category => {
        return Expense.findOne({
          where: {
            expenseCategoryId: request.params.expenseCategoryId
          },
          attributes: [
            "expenseCategoryId",
            [sequelize.fn("sum", sequelize.col("amount")), "total"]
          ],
          group: ["expense.expenseCategoryId"]
        })
          .then(expense => {
            return response.status(200).send({
              id: category.id,
              name: category.name,
              description: category.description,
              updatedAt: category.updatedAt,
              createdAt: category.createdAt,
              expensesTotal: expense.dataValues.total
            });
          })
          .catch(error => {
            response.status(400).send({ message: `${error}` });
          });
      })
      .catch(error => {
        response.status(404).send({ message: `${error}` });
      });
  }
};
