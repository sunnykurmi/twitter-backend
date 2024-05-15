const { catchError } = require("../middlewares/catchError");
const usermodel = require("../models/usermodel");
const postmodel = require("../models/postmodel");
const commentmodel = require("../models/commentmodel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const path = require("path");
const { all } = require("../routes/indexRoutes");

exports.homepage = catchError(async (req, res, next) => {
  const allposts = await postmodel
    .find()
    .populate("userid")
    .populate({
      path: "comments",
      populate: {
        path: "userid",
        model: "user", 
      },
    })
    .exec();
  res.json({ message: "homepage", allposts });
});

exports.usersignup = catchError(async (req, res, next) => {
  const newuser = await new usermodel(req.body).save();
  sendtoken(newuser, 201, res);
});

exports.currentuser = catchError(async (req, res, next) => {
  const loggedinuser = await usermodel.findById(req.id).exec();
  res.json({ loggedinuser });
});

exports.usersignin = catchError(async (req, res, next) => {
  const founduser = await usermodel
    .findOne({
      email: req.body.email,
    })
    .select("+password")
    .exec();
  if (!founduser)
    return next(
      new ErrorHandler("user not found with this email address ", 404)
    );
  const ismatched = founduser.comparepassword(req.body.password);
  if (!ismatched) return next(new ErrorHandler(" wrong credentials ", 500));
  console.log(founduser);
  sendtoken(founduser, 200, res);
});

exports.usersignout = catchError(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "successfully signed out" });
});

exports.newpost = catchError(async (req, res, next) => {
  const post = await new postmodel(req.body).save();
  const loggedinuser = await usermodel.findById(req.id).exec();
  post.userid = loggedinuser._id;
  loggedinuser.posts.push(post._id);
  loggedinuser.save();
  post.save();
  res.json({ post });
});

exports.newcomment = catchError(async (req, res, next) => {
  const comment = await new commentmodel(req.body).save();
  const loggedinuser = await usermodel.findById(req.id).exec();
  const post = await postmodel.findById(req.body.id).exec();
  post.comments.push(comment._id);
  comment.userid = loggedinuser._id;
  comment.save();
  post.save();
  res.json({ newcomment: comment });
});



exports.deletepost = catchError(async (req, res, next) => {
  const post = await postmodel
    .findByIdAndDelete({ _id: req.params.id })
    .exec();
  res.json({ message: "successfully deleted account" });
});