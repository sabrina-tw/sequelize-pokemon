const request = require("supertest");
const app = require("../app");

describe("Trainers", () => {
  describe("POST /trainers", () => {
    // TODO: need to clear testing database before re-running tests
    it.skip("should create new trainer given valid credentials", async () => {
      const newTrainer = { username: "username", password: "password" };
      const response = await request(app)
        .post("/trainers")
        .send(newTrainer)
        .expect(201);

      expect(response.body).toEqual(newTrainer);
    });
  });
});
