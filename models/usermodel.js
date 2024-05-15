const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usermodel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      select: false,
      // match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/]
    },
    avatar: {
      type: Object,
      default: {
        fileld: "65cf434588c257da33da7c5f",
        url: "https://ik.imagekit.io/sunnykurmi/resumebuilder-1708081987208_0ybPK8mrY.png",
      },
    },
    posts: [{
      type:mongoose.Schema.Types.ObjectId,ref:"post"
  }],
  },
  { timestamps: true }
);

usermodel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

usermodel.methods.comparepassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
usermodel.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const user = mongoose.model("user", usermodel);
module.exports = user;
