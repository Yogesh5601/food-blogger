import express from "express";
const router = express.Router();
import { v2 as cloudinary } from "cloudinary";
import Blog from "../model/blog.js";
import auth from "../middleware/auth.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRETE,
});

// post new blog
router.post("/", async (req, res, next) => {
  try {
    const file = req.files.photo;
    const imageUrl = await cloudinary.uploader.upload(file.tempFilePath);
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
// get all blog
router.get("/", async (req, res) => {
  try {
    const blog = await Blog.find();
    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found, please enter valid blog" });
    }
    return res.status(200).json({ message: "blog found", blog: blog });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
// get single blog by id
router.get("/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!blogId) {
      return res.status(404).json({ message: "please enter valid blog id" });
    }
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found, please enter valid blog" });
    }
    return res.status(200).json({ message: "blog found", blog: blog });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//  get blog by author
router.get("/author/:author", async (req, res) => {
  try {
    const author = req.params.author;
    const blog = await Blog.find({ author: author });
    return res.status(200).json({ message: "blog found", blogDetails: blog });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//  get blog by category
router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const blog = await Blog.find({ category: category });
    return res.status(200).json({ message: "blog found", blogDetails: blog });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
// update blog by id
router.put("/:id", auth, async (req, res) => {
  try {
    const file = req.files.photo;
    const imageUrl = await cloudinary.uploader.upload(file.tempFilePath);
    const updateBlog = await Blog.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
          author: req.body.author,
          image: imageUrl.url,
        },
      },
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ message: "Blog successfully updated", BlogDetails: updateBlog });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// delete blog
router.delete("/", auth, async (req, res) => {
  try {
    let imageUrl = req.query.imageUrl;
    let urlArray = imageUrl.split("/");
    let image = urlArray[urlArray.length - 1];
    let imageName = image.split(".")[0];
    let blogId = req.params.id;
    blogId = req.query.id;
    Blog.deleteOne({ _id: blogId })
      .then((result) => {
        cloudinary.uploader.destroy(imageName, (error, result) => {
          console.log(result);
        });
        res.status(200).json({
          message: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
