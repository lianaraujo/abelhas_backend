import express from "express";
import "express-async-errors";

import 'dotenv/config';
import "./env/config";
import "./connection";

import cors from "cors";
import routes from "./routes";
import errorHandler from "./errors/handler";

const app = express();

app.use(
  cors()
);
app.use(express.json());
app.use(routes);

app.use(errorHandler);

app.listen(process.env.PORT || 3333, () => {
  console.log("🍯 Listening on port 3333 🍯");
});

