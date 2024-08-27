import "express-async-errors";
import app from "./start/app";
import { envs } from "./config/envs";
import { MongoDatabase } from "./data/init";

console.log(">>> ENV VARIABLES", envs);

(async () =>
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONTO_DB,
  }))();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`>>> Listening on port ${PORT}...`);
});
