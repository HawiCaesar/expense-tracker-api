const expenseCategoriesController = require("../controllers").expenseCategories;
const expenseController = require("../controllers").expenses;

module.exports = app => {
  app.get("/api", (request, response) =>
    response.status(200).send({
      message: "Welcome to the Expense Tracker API"
    })
  );

  app.post("/api/expense-categories", expenseCategoriesController.create);
  app.get("/api/expense-categories", expenseCategoriesController.list);
  app.get(
    "/api/expense-categories/:expenseCategoryId",
    expenseCategoriesController.retrieve
  );
  app.put(
    "/api/expense-categories/:expenseCategoryId",
    expenseCategoriesController.update
  );
  app.delete(
    "/api/expense-categories/:expenseCategoryId",
    expenseCategoriesController.destroy
  );
  app.post(
    "/api/expense-categories/:expenseCategoryId/expenses",
    expenseController.create
  );
  app.put(
    "/api/expense-categories/:expenseCategoryId/expenses/:expenseId",
    expenseController.update
  );
  app.delete(
    "/api/expense-categories/:expenseCategoryId/expenses/:expenseId",
    expenseController.destroy
  );

  // method not allowed for
  app.all(
    "/api/expense-categories/:expenseCategoryId/expenses",
    (request, response) => {
      response.status(405).send({
        message: "Method not allowed"
      });
    }
  );
};
