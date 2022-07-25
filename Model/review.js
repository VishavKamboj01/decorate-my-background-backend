import mongoose from "mongoose";
import Joi from "@hapi/joi";

const reviewSchema = mongoose.Schema({
  userId: String,
  userName: String,
  review: String,
});

const Review = mongoose.model("Review", reviewSchema);

function validate(review) {
  const schema = {
    userId: Joi.string().required(),
    userName: Joi.string().required(),
    review: Joi.string().required(),
  };

  return Joi.validate(review, schema);
}

export { Review, validate };
