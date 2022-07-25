import config from "config";
import express from "express";
import helmet from "helmet";
import compression from "compression";
import users from "./Routes/users.js";
import auth from "./Routes/auth.js";
import review from "./Routes/reviews.js";
import { connectToDB } from "./Database/mongoDB.js";
import cors from "cors";
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATEL ERROR jwtPrivatekey is not defined");
  process.exit(1);
}

//Middleware Funtions
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

//Router
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/reviews", review);

connectToDB();

//Listening on a PORT

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
