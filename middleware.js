const { productSchema, reviewSchema } = require("./schema");
const validateProduct = (req, res, next) => {
  let { name, img, price, desc } = req.body;
  const { error } = productSchema.validate({ name, img, price, desc });

  if (error) {
    return res.render("error");
  }
  next(); // validation pass -> agla middleware/route handler chalao
};
const validateReview = () => {
  const { rating, comment } = req.body;
  const { error } = productSchema.validate({ rating, comment });
  if (error) {
    return res.render("error");
  }
  next();
};

module.exports = { validateReview, validateProduct };
