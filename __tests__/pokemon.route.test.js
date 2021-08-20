import express from "express";
import request from "supertest";

import { jest } from "@jest/globals"; // ES6 support

import pokemonRouter, { mockPokemonModel } from "../routes/pokemon.route.js";

jest.setTimeout(3000);
// jest.useFakeTimers();

// https://medium.com/@kvr2277/sequelize-mocking-with-jest-and-node-933c1f439579
// import SequelizeMock from 'sequelize-mock-v5';
// const mockDb = new SequelizeMock();

const myMockFn = jest.fn;

const pokemon1 = {
  id: 1,
  name: "Pikachu",
  japaneseName: "ピカチュウ",
  baseHP: 35,
  category: "Mouse Pokemon",
};

jest.mock("../db/models/simple-pokemon.model.js");

const app = express();
app.use("/", pokemonRouter());
// app.use("/", pokemonRouter(mockDb));

describe("/pokemon", () => {
  const mockPokemon1 = {
    ...pokemon1,
    toJSON: myMockFn(() => pokemon1),
  };

  // https://medium.com/@kvr2277/sequelize-mocking-with-jest-and-node-933c1f439579
  // https://github.com/facebook/jest/issues/10025
  beforeAll(async () => {
    mockPokemonModel({
      findAll: () => [pokemon1],
      create: async (ignore) => mockPokemon1,
    });
  });

  describe("GET /", () => {
    it("should return 200 with done message", async () => {
      const response = await request(app).get("/");

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
      const requestCreatePokemon1 = JSON.stringify({
        ...pokemon1,
        id: null,
      });
      const response = await request(app)
        .post("/new")
        .send(requestCreatePokemon1);

      expect(response.status).toEqual(200);

      const { body } = response;
      expect(body.id).toEqual(1);
      expect(body).toMatchObject(pokemon1);
    });
  });
});
