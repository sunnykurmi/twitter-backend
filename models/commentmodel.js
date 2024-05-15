const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const commentmodel = new mongoose.Schema(
  {
    userid: {
        type:mongoose.Schema.Types.ObjectId,ref:"user"
    },
    postid: {
        type:mongoose.Schema.Types.ObjectId,ref:"user"
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);


const comment = mongoose.model("comment", commentmodel);
module.exports = comment;
