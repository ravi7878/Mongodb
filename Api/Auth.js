// const express = require("express");
// const User = require("../DB/User");
// const route = express.Router();

// // @route  GET api/users
// //@desc    Test route
// //@access  Public
// route.post("/", async (req, res) => {
//   const { firstName, lastName } = req.body;
//   let user = {};
//   user.firstName = firstName;
//   user.lastName = lastName;
//   let userModel = new User(user);
//   await userModel.save();
//   res.json(userModel);
// });

// route.get("/", (req, res) => res.send("Api Running"));
// module.exports = route;
