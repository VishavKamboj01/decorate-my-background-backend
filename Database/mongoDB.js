import mongoose from "mongoose";
import config from "config";
import winston from "winston";

function connectToDB() {
  const url = config.get("db");
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => winston.info("Connected to DataBase... " + url))
    .catch((err) => winston.error("Could not connect to DB " + err));
}

export { connectToDB };
