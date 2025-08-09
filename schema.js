// schema for your server side validation
const Joi = require("joi");
const productSchema = Joi.object({
  name: Joi.string().required(),
  img: Joi.string().required(),
  price: Joi.string().min(0).required(),
  desc: Joi.string().required(),
});

// schema for review side valodation
const revierSchema = Joi.object({
  rating: Joi.string().min(0).required,
  comment: Joi.string().required(),
});

// ye yaha par named export kar rahe hai
module.exports = { productSchema, revierSchema };
