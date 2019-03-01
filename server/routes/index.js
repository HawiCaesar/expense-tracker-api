const expenseCategoriesController = require("../controllers").expenseCategories;
const expenseController = require("../controllers").expenses;

module.exports = app => {
  app.get("/api", (request, response) =>
    response.status(200).send({
      message: "Expense Tracker API"
    })
  );

  app.post("/api/expense-categories", expenseCategoriesController.create);
  app.get("/api/expense-categories", expenseCategoriesController.list);
  app.get(
    "/api/expense-categories/:expenseCategoryId",
    expenseCategoriesController.retrieve
  );
  app.post(
    "/api/expense-categories/:expenseCategoryId/expenses",
    expenseController.create
  );
  app.put(
    "/api/expense-categories/:expenseCategoryId",
    expenseCategoriesController.update
  );
  app.delete(
    "/api/expense-categories/:expenseCategoryId",
    expenseCategoriesController.destroy
  );
};
