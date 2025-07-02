const PostModel = require("../Models/Post.Model");
const UserModel = require("../Models/User.model");
const mongoose = require('mongoose');
//create post
const CreatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.userId;

    if (!title || !content) {
      return res.status(400).json({ 
        message: "Title and content are required", 
        success: false 
      });
    }


    const newPost = new PostModel({ title, content });
    const savedPost = await newPost.save();


    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { posts: { post_id: savedPost._id } } },
      { new: true }
    ).populate("posts");

    res.status(201).json({ 
      message: "Post created successfully", 
      post: savedPost,
      user: updatedUser,
      success: true 
    });
  } catch (error) {
    console.error("CreatePost Error:", error);
    res.status(500).json({ 
      message: "Internal error", 
      success: false, 
      error: error.message 
    });
  }
};
//get all post
const getPost = async (req, res) => {
  try {
    const posts = await PostModel.find()
    res.status(200).json({ 
      message: "Posts retrieved successfully", 
      posts, 
      success: true 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Internal error", 
      success: false, 
      error: error.message 
    });
  }
};
 //get post by id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
  
    const user = await UserModel.findById(id).populate({
      path: 'posts.post_id',  
      select: 'title content createdAt',  
      
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    res.status(200).json({
      message: "User with posts retrieved successfully",
      user,
      success: true
    });

  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error
    });
  }
};

module.exports = { CreatePost, getPost, getUserById };