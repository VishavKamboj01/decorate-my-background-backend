import express from "express";
import { User } from "../Model/user.js";
import { Review } from "../Model/review.js";
import jwtDecode from "jwt-decode";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const result = await Review.find();
    response.send(result);
  } catch (err) {
    response.send(err.message);
  }
});

router.post("/", async (request, response) => {
  const review = request.body;
  const u = jwtDecode(review.jwt);

  try {
    const user = await User.findById(u.id);
    if (!user) return response.status(400).send("User not found");

    const reviewObj = new Review({
      userId: user._id,
      userName: user.userName,
      review: review.data,
    });

    const result = await reviewObj.save();
    response.send(result);
  } catch (err) {
    response.send(err.message);
  }
});

export default router;
