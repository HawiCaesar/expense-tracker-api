const requests = require("supertest");
const app = require("../app");
const setup = require("./setup");
const destroy = require("./teardown");
const {
  validExpenseCategory,
  validExpense,
  anotherExpense,
  invalidExpense
} = require("./fixtures");

const api = new requests(app);

describe("Expenses tests", () => {
  beforeAll(async () => {
    await setup.createUser(setup.testUsers);
  });

  beforeEach(done => {
    api
      .post("/api/expense-categories")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[0].token)
      .send(validExpenseCategory)
      .end((ExpenseCategoryError, response) => {
        if (ExpenseCategoryError) {
          throw done(ExpenseCategoryError);
        }
        done();
      });
  });

  afterEach(async () => {
    await destroy.destroyExpenseCategories();
  });

  afterAll(async () => {
    await destroy.destroyUsers();
  });

  it("should create an expense in an expense category", done => {
    api
      .post("/api/expense-categories/1/expenses")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[0].token)
      .send(validExpense)
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(201);
        expect(response.body.name).toMatch("Fruits & vegetables");
        expect(response.body.amount).toEqual(500);
        done();
      });
  });

  it("should not create an expense using a different user", done => {
    api
      .post("/api/expense-categories/1/expenses")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[1].token)
      .send(validExpense)
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(404);
        expect(response.body.message).toMatch("Expense category not found");
        done();
      });
  });

  it("should fetch all expenses in an expense category", done => {
    api
      .post("/api/expense-categories/1/expenses")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[0].token)
      .send(anotherExpense)
      .then(response => {
        api
          .get("/api/expense-categories/1")
          .set("x-access-token", setup.testUsers[0].token)
          .end((error, response) => {
            if (error) {
              throw done(error);
            }
            expect(response.status).toEqual(200);
            expect(response.body.expenses.length).toEqual(1);
            done();
          });
      })
      .catch(error => {
        throw done(error);
      });
  });

  it("should not fetch expenses using a different user", done => {
    api
      .post("/api/expense-categories/1/expenses")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[0].token)
      .send(anotherExpense)
      .then(response => {
        api
          .get("/api/expense-categories/1")
          .set("x-access-token", setup.testUsers[1].token)
          .end((error, response) => {
            if (error) {
              throw done(error);
            }
            expect(response.status).toEqual(404);
            expect(response.body.message).toMatch("Expense category not found");
            done();
          });
      })
      .catch(error => {
        throw done(error);
      });
  });

  it("should update an expense in an expense category", done => {
    api
      .post("/api/expense-categories/1/expenses")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[0].token)
      .send(anotherExpense)
      .then(response => {
        api
          .put("/api/expense-categories/1/expenses/1")
          .set("Content-Type", "application/json")
          .set("x-access-token", setup.testUsers[0].token)
          .send(updateExpense)
          .end((error, response) => {
            if (error) {
              throw done(error);
            }
            expect(response.status).toEqual(200);
            expect(response.body.amount).toEqual(50);
            done();
          });
      })
      .catch(error => {
        throw done(error);
      });
  });

  it("should not update an expense using a different user", done => {
    api
      .post("/api/expense-categories/1/expenses")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[0].token)
      .send(anotherExpense)
      .then(response => {
        api
          .put("/api/expense-categories/1/expenses/1")
          .set("Content-Type", "application/json")
          .set("x-access-token", setup.testUsers[1].token)
          .send(updateExpense)
          .end((error, response) => {
            if (error) {
              throw done(error);
            }
            expect(response.status).toEqual(404);
            expect(response.body.message).toMatch("Expense not found");
            done();
          });
      })
      .catch(error => {
        throw done(error);
      });
  });

  it("should show an error message when updating a non-exisiting id", done => {
    api
      .post("/api/expense-categories/1/expenses")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[0].token)
      .send(anotherExpense)
      .then(response => {
        api
          .put("/api/expense-categories/1/expenses/14")
          .set("Content-Type", "application/json")
          .set("x-access-token", setup.testUsers[0].token)
          .send(updateExpense)
          .end((error, response) => {
            if (error) {
              throw done(error);
            }
            expect(response.status).toEqual(404);
            expect(response.body.message).toMatch("Expense not found");
            done();
          });
      })
      .catch(error => {
        throw done(error);
      });
  });

  it("should delete an expense in an expense category", done => {
    api
      .post("/api/expense-categories/1/expenses")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[0].token)
      .send(anotherExpense)
      .then(response => {
        api
          .delete("/api/expense-categories/1/expenses/1")
          .set("x-access-token", setup.testUsers[0].token)
          .end((error, response) => {
            if (error) {
              throw done(error);
            }
            expect(response.status).toEqual(204);
            done();
          });
      });
  });

  it("should show an error message when deleting a non exisiting expense", done => {
    api
      .post("/api/expense-categories/1/expenses")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[0].token)
      .send(anotherExpense)
      .then(response => {
        api
          .delete("/api/expense-categories/1/expenses/13")
          .set("x-access-token", setup.testUsers[0].token)
          .end((error, response) => {
            if (error) {
              throw done(error);
            }
            expect(response.status).toEqual(404);
            expect(response.body.message).toMatch("Expense not found");
            done();
          });
      });
  });

  it("should not delete an expense using a different user", done => {
    api
      .post("/api/expense-categories/1/expenses")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[0].token)
      .send(anotherExpense)
      .then(response => {
        api
          .delete("/api/expense-categories/1/expenses/1")
          .set("x-access-token", setup.testUsers[1].token)
          .end((error, response) => {
            if (error) {
              throw done(error);
            }
            expect(response.status).toEqual(404);
            expect(response.body.message).toMatch("Expense not found");
            done();
          });
      });
  });

  it("should show an error when no name given in an expense", done => {
    api
      .post("/api/expense-categories/1/expenses")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[0].token)
      .send({})
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(400);
        expect(response.body.message).toMatch("Expense name is required");
        done();
      });
  });

  it("should show an error when no amount given in an expense", done => {
    api
      .post("/api/expense-categories/1/expenses")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[0].token)
      .send({ name: "Muffin" })
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(400);
        expect(response.body.message).toMatch("Expense amount is required");
        done();
      });
  });

  it("should show an error when amount is invalid in an expense", done => {
    api
      .post("/api/expense-categories/1/expenses")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[0].token)
      .send(invalidExpense)
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(400);
        expect(response.body.message).toMatch(
          "Expense amount must be a number"
        );
        done();
      });
  });
});
