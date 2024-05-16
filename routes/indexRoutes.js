const express = require("express");
const {
  homepage,
  usersignup,
  usersignin,
  usersignout,
  currentuser,
  deletepost,
  newpost,
  newcomment
} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

//get
router.get("/", homepage);

//post /student
router.post("/user", isAuthenticated, currentuser);

//post/student/signup
router.post("/signup", usersignup);

//post/student/signup
router.post("/signin", usersignin);

//get/student/signout
router.get("/signout", isAuthenticated, usersignout);

//get/student/signout
router.post("/newpost", isAuthenticated, newpost);

//get/student/signout
router.post("/deletepost/:id", isAuthenticated, deletepost);

//get/student/signout
router.post("/newcomment", isAuthenticated, newcomment);

router.post


module.exports = router;
