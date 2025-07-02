const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
        type:String,
      enum: ["admin", "user"],
    },
    posts: [{
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: "PostModel" }
  }]
  },
  { timestamps: true }
);

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
