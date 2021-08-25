const request = require("supertest");
const app = require("../../app");
const db = require("../../models/index");

// jest.setTimeout(2000);  // default timeout: 5000ms

const pokemon1 = {
  name: "Pikachu",
  japaneseName: "ピカチュウ",
  baseHP: 35,
  category: "Mouse Pokemon",
};

describe("/pokemon", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await db.Pokemon.truncate();
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  // describe("GET /all", () => {
  //   it("should return all pokemons", async () => {
  //     const response = await request(app).get("/").expect(200);

  //     const { body } = response;
  //     expect(body.length).toEqual(1);
  //     expect(body[0]).toMatchObject(pokemon1);
  //   });
  // });

  describe("POST /", () => {
    it("should create and return the new pokemons", async () => {
      const newPokemonRequest = {
        ...pokemon1,
      };

      const response = await request(app)
        .post("/pokemons")
        .send(newPokemonRequest)
        .expect(201);

      const { body } = response;
      expect(body.id).toEqual(1);
      expect(body).toMatchObject(pokemon1);
    });
  });
});
