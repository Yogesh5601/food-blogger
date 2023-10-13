import express, { response } from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import "dotenv/config";
const secret_key = process.env.SECRETE_KEY;
import Blog from "../model/blog.js";

// create new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    if (!(username && email && phone && password)) {
      return res.status(400).json({ message: "please fill all details" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user alredy exist" });
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const userDetail = {
      username,
      email,
      phone,
      password: hashPassword,
    };
    const user = await User.create(userDetail);
    return res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "please enter email and password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "invalid user" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, secret_key, {
      expiresIn: "24h",
    });
    return res.status(200).json({
      message: "user loggedin successfully",
      data: { userId: user._id, username:user.username, token: token },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// get user by id
router.get("/:id", async (req, res) => {
  try {
    let userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "please enter valid user id" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json({ message: "user detail", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message, msg: "err" });
  }
});

// update user
router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: "please enter data" });
    }
    if (!userId) {
      return res.status(400).json({ message: "please enter valid user id" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (data.email) {
      const emailCheck = await User.findOne({ email: data.email });
      if (emailCheck) {
        return res.status(400).json({ message: "email alredy exist" });
      }
    }
    if (data.phone) {
      const phoneCheck = await User.findOne({ phone: data.phone });
      if (phoneCheck) {
        return res.status(404).json({ message: "phone alredy exist" });
      }
    }
    if (data.password) {
      if (data.password.length <= 6 || data.password.length >= 15) {
        return res.status(404).json({ message: "please enter valid password" });
      }
      const salt = 10;
      const hashPassword = await bcrypt.hash(data.password, salt);
      data.password = hashPassword;
    }
    let updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: data,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "user updated successfully", data: updateUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// delete user by id and all content related user
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "please enter valid user id" });
    }
    const user = await Blog.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found, please enter valid user" });
    }
    await Blog.deleteMany({username:user.username})
    await User.findByIdAndDelete(userId);
    return res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
export default router;
