import Joi from "@hapi/joi";
import jwt from "jsonwebtoken";
import config from "config";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  date_of_register: { type: Date, default: Date.now },
});

userSchema.methods.getAuthToken = function () {
  const token = jwt.sign(
    { id: this._id, userName: this.userName, email: this.email },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validate(user) {
  const schema = {
    userName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  };
  return Joi.validate(user, schema);
}

export { User, userSchema, validate };
