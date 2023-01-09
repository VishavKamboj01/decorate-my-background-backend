import mongoose from "mongoose";
import config from "config";
import winston from "winston";

function connectToDB() {
  const url = config.get("db");
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DataBase... " + url))
    .catch((err) => console.log("Could not connect to DB " + err+" "+ url));
}

export { connectToDB };
