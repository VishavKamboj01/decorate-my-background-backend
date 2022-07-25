import mongoose from "mongoose";

const mongoDBUrl = "mongodb://localhost/decorate_my_background";

function connectToDB() {
  mongoose
    .connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DataBase..."))
    .catch((err) =>
      console.error("Could not connect to database... error ", err)
    );
}

export { connectToDB };
