import app from "./app.js";

const PORT = process.env.PORT || 4000;

export const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
