import express from "express";
const router = express.Router();
import Blog from "../model/blog.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dh3lha6wf",
  api_key: "962497148612266",
  api_secret: "dGxbmHMcXkco2kW2qW7BCXM0wJ0",
});

// post new blog
router.post("/", async (req, res) => {
  try {
    const file = req.files.photo;
    const imageUrl = await cloudinary.uploader.upload(file.tempFilePath);
    // console.log(imageUrl);
    const blogDetails = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      author: req.body.author,
      image: imageUrl.url,
    };
    const blog = await Blog.create(blogDetails);
    return res
      .status(200)
      .json({ message: "Blog successfully created", BlogDetails: blog });
  } catch (error) {
    return res.status(500).json({ message: error.message, msg: error });
  }
});

export default router;
