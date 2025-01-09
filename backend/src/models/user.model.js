import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [5, "Name mmust be at least 5 character"],
    maxLength: [50, "name should be 50 character"],
    lowercase: true,
    trim: true,
  },
  lastName: {
    type: String,
    minLength: [5, "Name mmust be at least 5 character"],
    maxLength: [50, "name should be 50 character"],
    lowercase: true,
    trim: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please fill valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "password is must be 8 character"],
  },
  age: {
    type: Number,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["female", "male", "other"],
  },
  photoUrl: {
    public_id: {
      type: String,
    },
    secure_url: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
    },
  },
  about: {
    type: String,
    trim: true,
    minLength: [8, "about must be greater then 8 character"],
    maxLength: [120, "about must be less then 120 character"],
    default: "this is default about of user",
  },
  skills: {
    type: [String],
    validator: function (skills) {
      return skills.length <= 10; // Limit to 10 skills
    },
    message: "You can only add up to 10 skills.",
  },
});

UserSchema.pre("save", function (next) {
  if (this.isModified("emailId")) {
    this.invalidate("email", "Email cannot be updated");
  }
  next();
});

// before saving the data into DB check password is encrypted or not
// user password hash function code
UserSchema.pre('save',async function(next){
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hash(this.password , 10);
  next();
})

// compare password method

UserSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password , this.password)
}

UserSchema.methods.generateJWTToken = async function() {
  return jwt.sign(
    { _id: this._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1h' } // Default to 1 hour if not set
  );
};



const User = mongoose.model("User", UserSchema);

export default User
