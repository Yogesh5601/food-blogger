import express from "express";
const router = express.Router();
import Category from "../model/category.js";

// create category
router.post("/", async (req, res) => {
  try {
    const category = new Category({
      category: req.body.category,
    });

    let result = await category.save();
    return res.status(200).json(result);
  } catch (error) {
    console.log(err);
    return res.status(500).json({ err: err });
  }
});

// get category
router.get("/", async (req, res) => {
  try {
    const category = req.body;
    const categories = await Category.find();
    return res.status(200).json({ category: categories });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// delete categorry
router.delete("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByIdAndDelete(categoryId);
    return res.status(200).json({ message: "category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
