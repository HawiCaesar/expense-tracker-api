const requests = require("supertest");
const app = require("../app");

const api = new requests(app);

describe("Undefined routes", () => {
  it("should give an error message detail no resource found", done => {
    api.get("/someroute").end((error, response) => {
      expect(response.status).toEqual(404);
      done();
    });
  });
});
