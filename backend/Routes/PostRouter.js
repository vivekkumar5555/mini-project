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
const loginController = require("../Controllers/Login");

const router = express.Router();

//  Registeration
router.post("/user", userCreate);

// create post
router.post("/post",authMiddleware, CreatePost);
router.get("/post", getPost);
router.get("/user/:id",authMiddleware,getUserById);
router.put("/post/:id", authMiddleware,  updatePost);
router.delete("/post/:id",authMiddleware,   deletepost);
//login
router.post("/login",loginController)
//verfiycookie
router.get('/verify-auth', authMiddleware, (req, res) => {
  res.json({ 
    success: true,
    message: "Authenticated",
    user: req.user 
  });
});


module.exports = router;
