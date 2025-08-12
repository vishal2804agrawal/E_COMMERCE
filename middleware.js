const { productSchema, reviewSchema } = require("./schema");
const validateProduct = (req, res, next) => {
  let { name, img, price, desc } = req.body;
  const { error } = productSchema.validate({ name, img, price, desc });

  if (error) {
    return res.render("error");
  }
  next(); // validation pass -> agla middleware/route handler chalao
};
const validateReview = (req, res, next) => {
  const { rating, comment } = req.body;
  const { error } = productSchema.validate({ rating, comment });
  if (error) {
    return res.render("error");
  }
  next();
};

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Please login first");
    return res.redirect("/login");
  }
  next();
};
module.exports = { isLoggedIn, validateReview, validateProduct };
