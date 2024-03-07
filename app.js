import express from "express";
import cors from "cors";
import { db } from "./db/connection.js";
import { router } from "./routes/jobs.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(router);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

db.authenticate()
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log(error));
