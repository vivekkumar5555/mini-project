const userModel = require("../Models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCreate = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "something is missing", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      post: [],
      role,
    });

    const newUserCreated = await newUser.save();

    const token = jwt.sign({ userId: newUser._id ,email:newUser.email}, "qwerty", {
      expiresIn: "24h",
    });

    res.status(201).json({
      message: "User Created Successfully",
      success: true,
      newUserCreated,
      token,
    });
  } catch (error) {
    res
      .status(501)
      .json({ message: "user not Created", success: false, error });
  }
};

module.exports = userCreate ;
