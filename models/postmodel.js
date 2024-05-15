const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const postmodel = new mongoose.Schema(
  {
    userid: {
        type:mongoose.Schema.Types.ObjectId,ref:"user"
    },
    message: {
      type: String,
    },
    comments: [{
      type:mongoose.Schema.Types.ObjectId,ref:"comment" 
    }],
  },
  { timestamps: true }
);


const post = mongoose.model("post", postmodel);
module.exports = post;
