import "dotenv/config";
import express, { Express } from "express";
import { receiptRouter } from "./routers/receipt.router";

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use("/api/popular-recipes", receiptRouter);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
