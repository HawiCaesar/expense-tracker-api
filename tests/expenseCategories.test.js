const requests = require("supertest");
const app = require("../app");
const setup = require("./setup");
const destroy = require("./teardown");
const {
  initialExpenseCategory,
  validExpenseCategory,
  updateExpenseCategory,
  anotherExpenseCategory
} = require("./fixtures");

const api = new requests(app);

describe("test expense categories", () => {
  beforeAll(async () => {
    await setup.createUser(setup.testUsers);
  });

  beforeEach(done => {
    api
      .post("/api/expense-categories")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[0].token)
      .send(initialExpenseCategory)
      .end((error, response) => {
        if (error) {
          throw done(error);
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

  it("should create an expense category", done => {
    api
      .post("/api/expense-categories")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[0].token)
      .send(validExpenseCategory)
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(201);
        expect(response.body.name).toMatch("Food & Upkeep");
        done();
      });
  });

  it("should update an expense category", done => {
    api
      .put("/api/expense-categories/1")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[0].token)
      .send(updateExpenseCategory)
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(200);
        done();
      });
  });

  it("should not update an expense category with different access token", done => {
    api
      .put("/api/expense-categories/1")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[1].token)
      .send(updateExpenseCategory)
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.body.message).toMatch("Expense category not found");
        expect(response.status).toEqual(400);
        done();
      });
  });

  it("should show an error message when cannot update a non-existing id", done => {
    api
      .put("/api/expense-categories/13")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[0].token)
      .send(updateExpenseCategory)
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(400);
        expect(response.body.message).toMatch("Expense category not found");
        done();
      });
  });

  it("should fetch one expense category", done => {
    api
      .get("/api/expense-categories/1")
      .set("x-access-token", setup.testUsers[0].token)
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(200);
        expect(JSON.parse(response.text).id).toEqual(1);
        done();
      });
  });

  it("should not fetch expense category with different access token", done => {
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
  });

  it("should show an error message when cannot fetch non-exisiting id", done => {
    api
      .get("/api/expense-categories/10")
      .set("x-access-token", setup.testUsers[0].token)
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(404);
        expect(response.body.message).toMatch("Expense category not found");
        done();
      });
  });

  it("should list all expense categories stored", done => {
    api
      .post("/api/expense-categories")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[0].token)
      .send(anotherExpenseCategory)
      .then(response => {
        api
          .get("/api/expense-categories")
          .set("x-access-token", setup.testUsers[0].token)
          .end((error, response) => {
            if (error) {
              throw done(error);
            }
            expect(response.status).toEqual(200);
            expect(response.body.length).toEqual(2);
            done();
          });
      })
      .catch(error => {
        throw done(error);
      });
  });

  it("should not list expense categories stored with different access token", done => {
    api
      .post("/api/expense-categories")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[1].token)
      .send(anotherExpenseCategory)
      .then(response => {
        api.get("/api/expense-categories").end((error, response) => {
          if (error) {
            throw done(error);
          }
          expect(response.status).toEqual(400);
          done();
        });
      })
      .catch(error => {
        throw done(error);
      });
  });

  it("should delete one expense category", done => {
    api
      .delete("/api/expense-categories/1")
      .set("x-access-token", setup.testUsers[0].token)
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(204);
        done();
      });
  });

  it("should not allow deletion on non-existing id", done => {
    api
      .delete("/api/expense-categories/9")
      .set("x-access-token", setup.testUsers[0].token)
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(404);
        done();
      });
  });

  it("should not allow deletion using another user access token", done => {
    api
      .delete("/api/expense-categories/2")
      .set("x-access-token", setup.testUsers[1].token)
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(404);
        done();
      });
  });

  it("should show an error when no name given in an expense category", done => {
    api
      .post("/api/expense-categories")
      .set("Content-Type", "application/json")
      .set("x-access-token", setup.testUsers[0].token)
      .send({})
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(400);
        expect(response.body.message).toMatch(
          "Expense category name is required"
        );
        done();
      });
  });
});
