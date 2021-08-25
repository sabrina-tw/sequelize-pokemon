const request = require("supertest");
const app = require("../../app");
const db = require("../../models/index");

describe("/pokemons", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await db.Pokemon.truncate({ cascade: true });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  describe("POST /", () => {
    it("should create and return the new pokemons", async () => {
      const newPokemon = {
        name: "Pikachu",
        japaneseName: "ピカチュウ",
        baseHP: 35,
        category: "Mouse Pokemon",
      };

      const response = await request(app)
        .post("/pokemons")
        .send(newPokemon)
        .expect(201);

      const { body } = response;
      expect(body.id).toEqual(1);
      expect(body).toMatchObject(newPokemon);
    });
  });

  // describe("GET /all", () => {
  //   it("should return all pokemons", async () => {
  //     const response = await request(app).get("/pokemons").expect(200);

  //     const { body } = response;
  //     expect(body.length).toEqual(1);
  //     expect(body[0]).toMatchObject(newPokemon);
  //   });
  // });
});
