import User from "../models/user.model.js";

// signup user
const signup = async (req, res) => {
  try {
    const { emailId, firstName, password,skills,age,gender,about } = req.body;
    if (!emailId || !firstName || !password) {
      return (
        res.status(400),
        json({
          success: false,
          message: "All field are required",
          data: {},
        })
      );
    }
    const userExists = await User.findOne({ emailId });

    if (userExists) {
      return (
        res.status(409).
        json({
          success: false,
          message: "user with this email already exits",
          data: {},
        })
      );
    }

    const user = await User.create({
      firstName,
      emailId,
      password,
      age,
      about,
      gender,
      skills
    });

    if (!user)
      return res.status(500).json({
        success: false,
        message: "error while user created",
      });
      user.save();

    const createdUser = await User.findById( user._id).select("-password");

    if (!createdUser) {
      return (
        res.status(500).
        json({
          success: false,
          message: "Error retrieving created user !!!",
          data: {},
        })
      );
    }

    return res.status(201).json({
      success: true,
      message: "user created successfully",
      data: createdUser,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

// user login controller
const login = async (req, res, next) => {
  const { emailId, password } = req.body;
  if (!emailId || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
      data: {},
    });
  }

  try {
    // Get user with the password for comparison
    const user = await User.findOne({ emailId });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
        data: {},
      });
    }

    // Compare the entered password with the stored hashed password
    if (!(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
        data: {},
      });
    }

    // Remove password from the user object after comparison
    const loggedUser = await User.findById(user._id).select("-password");

    // Generate JWT token
    const token = await user.generateJWTToken();

    // Set the cookie with token
    res.cookie("token", token);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: loggedUser,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

// update user route
const updateUser = async (req, res) => {
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

    if (data?.skills?.length > 10) {
      throw new Error("skills must be less then 10");
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
};

const userProfile = async (req, res) => {
 const {_id} = req.user


 const userProfile = await User.findById(_id).select('-password')
 if(!userProfile){
  res.status(409).json({
    success: false,
    message: "something went wrong please login again",
    data: {},
  });
 }
  res.status(200).json({
    success: true,
    message: "user profile",
    data: userProfile,
  });
};

export { signup, updateUser, userProfile, login };
