import express from "express";
import { validate, User } from "../Model/user.js";
import bcrypt from "bcrypt";
import authenticate from "../Middleware/Authenticator.js";
const router = express.Router();

//Getting the current user
router.get("/me", authenticate, async (request, response) => {
  try {
    const user = await User.findById(request.user.id);
    if (!user)
      response.status(400).send("User with the given ID was not found");
    response.send(user);
  } catch (err) {
    response.status(500).send("Unexpected Error Occured");
  }
});

//Creating a new User
router.post("/", async (request, response) => {
  const newUser = request.body;

  const { error } = validate(newUser);
  if (error) {
    console.log(error);
    response.status(400).send(error.details[0].message);
    return;
  }

  const user = new User({
    userName: newUser.userName,
    email: newUser.email,
    password: newUser.password,
  });

  //Checking if the user is already registered
  const isPresent = await User.find({ email: user.email });
  if (isPresent.length !== 0) {
    response.status(400).send("User Already Registered");
    return;
  }

  //Hashing the password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const result = await user.save();
  const token = user.getAuthToken();
  response
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token").header("access-control-allow-origin","http://decorate-my-background.onrender.com")
    .send(result);
});

router.put("/:id", (request, response) => {
  const userObj = request.body;
  const { error } = validate(userObj);

  if (error) {
    response.status(400).send(error.details[0].message);
    return;
  }

  // const user = findUser(request.params.id);
  // if (!user) {
  //   response.status(404).send("The user with the given ID was not found");
  //   return;
  // }

  // user.userName = userObj.userName;
  // user.email = userObj.email;
  // user.password = userObj.password;
  // response.send(users);
});

router.delete("/:id", (request, response) => {
  const id = request.params.id;
  // const user = findUser(id);
  // if (!user) {
  //   response.status(404).send("The user with the given ID was not found");
  //   return;
  // }
  // users = users.filter((user) => user.id !== id);
  // response.send(user);
});

//Helper Functions

function findUser(userId) {
  const user = users.find((userObj) => userObj.id === userId);
  return user;
}

export default router;
