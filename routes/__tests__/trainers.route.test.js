const request = require("supertest");
const app = require("../../app");
const db = require("../../models/index");

describe("Trainers", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await db.Trainer.truncate();
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  describe("POST /trainers", () => {
    it("should create new trainer given valid credentials", async () => {
      const newTrainer = { username: "username", password: "password" };
      const { body } = await request(app)
        .post("/trainers")
        .send(newTrainer)
        .expect(201);

      expect(body.username).toEqual(newTrainer.username);
      expect(body.password).not.toEqual(newTrainer.password);
    });
  });
});
