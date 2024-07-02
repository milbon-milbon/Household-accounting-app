import express from "express";
const app = express();
app.use(express.json());

app.get("/transactions", (req, res) => {
  res.json([{ id: 1, amount: 100 }]);
});

export default app;
