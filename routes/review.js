const express = require("express");
const router = express.Router(); //mini instance
const Product = require("../models/Product");
const Review = require("../models/Review");
const { validateReview } = require("../middleware");

// middleware use kiya hai revier valid hai ya nahi
router.post("/products/:id/review", validateReview, async (req, res) => {
  try {
    let { id } = req.params;
    let { rating, comment } = req.body;
    const product = await Product.findById(id);
    const review = new Review({ rating, comment });

    product.reviews.push(review);
    await review.save();
    await product.save();
    req.flash("msg", "Revied added successfully");
    res.redirect(`/products/${id}`);
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});

module.exports = router;
