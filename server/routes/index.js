const expenseCategoriesController = require("../controllers").expenseCategories;
const expenseController = require("../controllers").expenses;
const usersController = require("../controllers").users;
const Auth = require("../middleware/auth");

module.exports = app => {
  app.get("/api", (request, response) =>
    response.status(200).send({
      message: "Welcome to the Expense Tracker API"
    })
  );

  app.post("/api/users", usersController.createUser);
  app.post("/api/users/login", usersController.loginUser);

  app.post(
    "/api/expense-categories",
    Auth.verifyToken,
    expenseCategoriesController.create
  );
  app.get(
    "/api/expense-categories",
    Auth.verifyToken,
    expenseCategoriesController.list
  );
  app.get(
    "/api/expense-categories/:expenseCategoryId",
    Auth.verifyToken,
    expenseCategoriesController.retrieve
  );
  app.put(
    "/api/expense-categories/:expenseCategoryId",
    Auth.verifyToken,
    expenseCategoriesController.update
  );
  app.delete(
    "/api/expense-categories/:expenseCategoryId",
    Auth.verifyToken,
    expenseCategoriesController.destroy
  );
  app.post(
    "/api/expense-categories/:expenseCategoryId/expenses",
    Auth.verifyToken,
    expenseController.create
  );
  app.put(
    "/api/expense-categories/:expenseCategoryId/expenses/:expenseId",
    Auth.verifyToken,
    expenseController.update
  );
  app.delete(
    "/api/expense-categories/:expenseCategoryId/expenses/:expenseId",
    Auth.verifyToken,
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
