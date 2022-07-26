import mongoose from "mongoose";
import json from "../config/default.json" assert { type: "json" };

function connectToDB() {
  mongoose
    .connect(json.db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DataBase..."))
    .catch((err) =>
      console.error("Could not connect to database... error ", err)
    );
}

export { connectToDB };
