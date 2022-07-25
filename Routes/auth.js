import express from "express";
import bcrypt from "bcrypt";
import { User } from "../Model/user.js";
import Joi from "@hapi/joi";
const router = express.Router();

router.post("/", async (request, response) => {
  const body = request.body;

  const { error } = validate(body);
  if (error) {
    response.status(400).send(error.details[0].message);
    return;
  }

  let user = await User.findOne({ email: body.email });
  if (!user) {
    response.status(400).send("Invalid email or password");
    return;
  }

  try {
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword)
      return response.status(400).send("Invalid email or password");

    const token = user.getAuthToken();
    response.send(token);
  } catch (err) {
    console.log(err.message);
  }
});

function validate(user) {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  };
  return Joi.validate(user, schema);
}

export default router;
