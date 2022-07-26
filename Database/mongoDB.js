import mongoose from "mongoose";
import config from "config";

function connectToDB() {
  mongoose
    .connect(config.get("db"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to DataBase..."))
    .catch((err) =>
      console.error("Could not connect to database... error ", err)
    );
}

export { connectToDB };
