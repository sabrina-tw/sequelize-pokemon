const request = require("supertest");
const app = require("../../app");
const db = require("../../models/index");

// jest.setTimeout(2000);  // default timeout: 5000ms

const pokemon1 = {
  id: 1,
  name: "Pikachu",
  japaneseName: "ピカチュウ",
  baseHP: 35,
  category: "Mouse Pokemon",
};

describe("/pokemon", () => {
  beforeEach(async () => {
    await db.SimplePokemon.sync({ force: true });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  describe("GET dummy /pokemon", () => {
    it("should return 200 with done message", async () => {
      const response = await request(app).get("/pokemon");

      expect(response.status).toEqual(200);
      expect(response.body.message).toEqual("done");
    });
  });

  // describe("GET /all", () => {
  //   it("should return all pokemons", async () => {
  //     const response = await request(app).get("/all").expect(200);

  //     const { body } = response;
  //     expect(body.length).toEqual(1);
  //     expect(body[0]).toMatchObject(pokemon1);
  //   });
  // });

  describe("POST /new", () => {
    it("should create and return the new pokemons", async () => {
      const newPokemonRequest = {
        ...pokemon1,
        id: null,
      };

      const response = await request(app)
        .post("/pokemon/new")
        .send(newPokemonRequest)
        .expect(200);

      const { body } = response;
      expect(body.id).toEqual(1);
      expect(body).toMatchObject(pokemon1);
    });
  });
});
