const requests = require("supertest");
require("dotenv").config();
const app = require("../app");
const destroy = require("./teardown");
const User = require("../server/models").user;

const api = new requests(app);

describe("user tests", () => {
  afterAll(async () => {
    await destroy.destroyUsers();
  });

  it("should allow a user to sign up", done => {
    api
      .post("/api/users/signup")
      .set("Content-Type", "application/json")
      .send({
        email: "user1@test.com",
        password: "pass123#@!"
      })
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        User.findOne({
          where: {
            email: "user1@test.com"
          }
        }).then(user => {
          expect(user.dataValues.email).toBe("user1@test.com");
          done();
        });
      });
  });

  it("should show an error message when email is not valid on signup", done => {
    api
      .post("/api/users/signup")
      .set("Content-Type", "application/json")
      .send({
        email: "an-email",
        password: "pass123#@!"
      })
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(400);
        expect(response.body.message).toMatch(
          "Please provide a valid email address"
        );
        done();
      });
  });

  it("should show an error message when the supplied with an existing user on signup", done => {
    api
      .post("/api/users/signup")
      .set("Content-Type", "application/json")
      .send({
        email: "user1@test.com",
        password: "pass123#@!"
      })
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(400);
        expect(response.body.message).toMatch(
          "User with that EMAIL already exists"
        );
        done();
      });
  });

  it("should show an error message when not supplied with email and password on signup", done => {
    api
      .post("/api/users/signup")
      .set("Content-Type", "application/json")
      .send({})
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(400);
        expect(response.body.message).toMatch("Credentials missing");
        done();
      });
  });

  it("should allow the user to login", done => {
    api
      .post("/api/users/login")
      .set("Content-Type", "application/json")
      .send({
        email: "user1@test.com",
        password: "pass123#@!"
      })
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
        done();
      });
  });

  it("should show an error message when no credentials provided on login", done => {
    api
      .post("/api/users/login")
      .set("Content-Type", "application/json")
      .send({})
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(400);
        expect(response.body.message).toMatch("Credentials missing");
        done();
      });
  });

  it("should show an error message when email is not valid on login", done => {
    api
      .post("/api/users/login")
      .set("Content-Type", "application/json")
      .send({
        email: "an-email",
        password: "pass123#@!"
      })
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(400);
        expect(response.body.message).toMatch(
          "Please provide a valid email address"
        );
        done();
      });
  });

  it("show an error message when user name or password is wrong", done => {
    api
      .post("/api/users/login")
      .set("Content-Type", "application/json")
      .send({
        email: "user23@gmail.com",
        password: "pass123#@!"
      })
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(401);
        expect(response.body.message).toMatch("Incorrect credentials");
        done();
      });

    api
      .post("/api/users/login")
      .set("Content-Type", "application/json")
      .send({
        email: "user1@test.com",
        password: "notTheCorrectPassword!"
      })
      .end((error, response) => {
        if (error) {
          throw done(error);
        }
        expect(response.status).toEqual(401);
        expect(response.body.message).toMatch("Incorrect credentials");
        done();
      });
  });
});
