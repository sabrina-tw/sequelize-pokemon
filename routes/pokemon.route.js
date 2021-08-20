import express from "express";
const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  res.status(200).json({ message: "done" });
});

export default router;

export const mockPokemonModel = (mockModel) => {
  SimplePokemon = mockModel;
};

export const initPokemonModel = async () => {
  SimplePokemon = await InitSimplePokemon(dbConnection);
};
