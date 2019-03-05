const requests = require("supertest");
const app = require("../app");

const api = new requests(app);

describe("Undefined routes", () => {
  it("should give an error message detail no resource found", done => {
    api.get("/someroute").end((error, response) => {
      expect(response.status).toEqual(404);
      expect(JSON.parse(response.text).message).toEqual(
        "Oops resource not found"
      );
      if (error) {
        throw done(error);
      }
      done();
    });
  });

  it("should show the welcome route indicate the passage to api", done => {
    api.get("/api").end((success, response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });
});
