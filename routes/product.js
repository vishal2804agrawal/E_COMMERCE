const express = require("express");
const Product = require("../models/Product");
const Review = require("../models/Review");
const router = express.Router(); //mini instance
const { validateProduct, isLoggedIn } = require("../middleware");

// to show all the products
router.get("/products", isLoggedIn, async (req, res) => {
  try {
    let products = await Product.find({});
    res.render("products/index", { products });
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});

// to show the form for new product
router.get("/product/new", isLoggedIn, (req, res) => {
  try {
    res.render("products/new");
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});

// to actually add the product
router.post("/products", isLoggedIn, validateProduct, async (req, res) => {
  try {
    let { name, img, price, desc } = req.body;

    await Product.create({ name, img, price, desc });
    req.flash("success", "Product added successfully"); // success key isliye likhi kyu ki apne middleware mai bhi seccess sai key banai hai
    res.redirect("/products");
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});

// to show a particular product
router.get("/products/:id", isLoggedIn, async (req, res) => {
  try {
    let { id } = req.params;
    let foundProduct = await Product.findById(id).populate("reviews");
    res.render("products/show", { foundProduct, msg: req.flash("msg") });
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});

// form to edit the product
router.get("/products/:id/edit", isLoggedIn, async (req, res) => {
  try {
    let { id } = req.params;
    let foundProduct = await Product.findById(id);
    res.render("products/edit", { foundProduct });
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});

// to actually edit the data in db
router.patch("/products/:id", isLoggedIn, validateProduct, async (req, res) => {
  try {
    let { id } = req.params;
    let { name, img, price, desc } = req.body;
    await Product.findByIdAndUpdate(id, { name, img, price, desc });
    req.flash("success", "Product edited successfully");
    res.redirect(`/products/${id}`);
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});
router.delete("/products/:id", isLoggedIn, async (req, res) => {
  try {
    let { id } = req.params;
    const product = await Product.findById(id);

    // for(let id of product.reviews){
    //     await Review.findByIdAndDelete(id);
    // }

    await Product.findByIdAndDelete(id);
    req.flash("success", "Product deleted successfully");
    res.redirect("/products");
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});

module.exports = router;
