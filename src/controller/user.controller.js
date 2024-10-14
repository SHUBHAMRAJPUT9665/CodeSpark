import User from "../models/user.model.js";


// signup user
const signup = async (req,res) =>{
    try {
        const { emailId, firstName, password } = req.body;
    
        const userData = new User({
          emailId,
          password,
          firstName,
        });
    
        userData.save();
    
        res.status(200).json({
          success: true,
          message: "user created",
        });
      } catch (error) {}
}


// update user route
const updateUser = async (req,res) =>{
    const userId = req.params?.userId; // Correctly access the userId
    const data = req.body;
    try {
      const ALLOWED_UPDATE = ["skills", "photoUrl", "about", "gender", "age"];
      const isUpdateAllowed = Object.keys(data).every((k) =>
        ALLOWED_UPDATE.includes(k)
      );
  
      if (!isUpdateAllowed) {
        throw new Error("update not allowed");
      }
  
      if(data?.skills?.length > 10){
        throw new Error("skills must be less then 10")
      }
      const user = await User.findByIdAndUpdate(userId, data, {
        // Pass userId directly
        new: true, // Use 'new' to return the updated document
        runValidators: true,
      });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
          data: {},
        });
      }
  
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
        data: {},
      });
    }
}



const userProfile = async (req , res) =>{


    console.log("user profile controller")

    res.status(200).json({
        success:true,
        message:"user profile",
        data:{}
    })
}


export {signup,updateUser,userProfile}