const userModel = require("../Models/Post.Model");

const deletepost=async (req, res) => {
  try {
    const { id } = req.params;
    const DeleteUser = await userModel.findByIdAndDelete(id);
    console.log(DeleteUser);
    res
      .status(200)
      .json({ message: "Post Deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "internal error", success: false });
  }
}

const updatePost=async(req,res)=>{
  try {
    const {id}=req.params;
    const {title,content}=req.body;
    const updatePost=await userModel.findByIdAndUpdate(id,{
      title,
      content
    },{new:true})
   res
      .status(200)
      .json({ message: " update post successfully", success: true,updatePost });
  } catch (error) {
    res.status(500).json({ message: "internal error", success: false });
  }
}
module.exports={deletepost,updatePost};