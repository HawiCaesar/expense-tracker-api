const requests = require("supertest");
const app = require("../app");
const destroy = require("./teardown");
const {
  validExpenseCategory,
  updateExpenseCategory,
  anotherExpenseCategory
} = require("./fixtures");

const api = new requests(app);

describe("test expense categories", () => {
  afterAll(async () => {
    await destroy.destroyExpenseCategories();
  });

  it("should create an expense category", done => {
    api
      .post("/api/expense-categories")
      .set("Content-Type", "application/json")
      .send(validExpenseCategory)
      .end((error, response) => {
        expect(response.status).toEqual(201);
        if (error) {
          throw done(error);
        }
        done();
      });
  });

  it("should update an expense category", done => {
    api
      .put("/api/expense-categories/1")
      .set("Content-Type", "application/json")
      .send(updateExpenseCategory)
      .end((error, response) => {
        expect(response.status).toEqual(200);
        if (error) {
          throw done(error);
        }
        done();
      });
  });

  it("should show an error message when cannot update a non-existing id", done => {
    api
      .put("/api/expense-categories/13")
      .set("Content-Type", "application/json")
      .send(updateExpenseCategory)
      .end((error, response) => {
        expect(response.status).toEqual(400);
        expect(response.body.message).toMatch("Expense category not found");
        if (error) {
          throw done(error);
        }
        done();
      });
  });

  it("should fetch one expense category", done => {
    api.get("/api/expense-categories/1").end((error, response) => {
      expect(response.status).toEqual(200);
      expect(JSON.parse(response.text).id).toEqual(1);
      if (error) {
        throw done(error);
      }
      done();
    });
  });

  it("should show an error message when cannot fetch non-exisiting id", done => {
    api.get("/api/expense-categories/10").end((error, response) => {
      expect(response.status).toEqual(404);
      expect(response.body.message).toMatch("Expense category not found");
      if (error) {
        throw done(error);
      }
      done();
    });
  });

  it("should list all expense categories stored", done => {
    api
      .post("/api/expense-categories")
      .set("Content-Type", "application/json")
      .send(anotherExpenseCategory)
      .end((error, response) => {
        if (error) {
          throw done(error);
        }

        api.get("/api/expense-categories").end((error, response) => {
          expect(response.status).toEqual(200);
          expect(response.body.length).toEqual(2);
          if (error) {
            throw done(error);
          }
          done();
        });
      });
  });

  it("should delete one expense category", done => {
    api.delete("/api/expense-categories/2").end((error, response) => {
      expect(response.status).toEqual(204);
      if (error) {
        throw done(error);
      }
      done();
    });
  });

  it("should not allow deletion on non-existing id", done => {
    api.delete("/api/expense-categories/9").end((error, response) => {
      expect(response.status).toEqual(404);
      if (error) {
        throw done(error);
      }
      done();
    });
  });
});
