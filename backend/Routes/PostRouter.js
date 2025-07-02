const express = require("express");
const {
  CreatePost,
  getPost,
  getPostById,
  getUserById,
} = require("../Controllers/CreatePost");
const { deletepost, updatePost } = require("../Controllers/DeletePost");
const userCreate = require("../Controllers/userCreate");
const authMiddleware = require("../Middleware/auth");

const router = express.Router();

// User Routes
router.post("/user", userCreate);

// Post Routes
router.post("/post", authMiddleware, CreatePost);
router.get("/post", getPost);
router.get("/user/:id",getUserById);
router.put("/post/:id",  updatePost);
router.delete("/post/:id",  deletepost);

module.exports = router;
