const express = require("express");
const User = require("../DB/User");
const route = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
// @route  Post api/users
//@desc    Register route
//@access  Public
route.post(
  "/",
  [
    check("firstName", "First Name is required").not().isEmpty(),
    check("lastName", "Last Name is required").not().isEmpty(),
    check("email", "Please Enter valid email ").isEmail(),
    check("password", "Password length must be 6 character").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, email, password } = req.body;
    try {
      //see if user exist
      let user = await User.findOne({ email });
      if (user) {
        console.log("---------user already exist");
        res.status(400).json({ errors: [{ msg: "User Already Exist" }] });
      }
      //Get users Gravatar

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        firstName,
        lastName,
        email,
        password,
        avatar,
      });
      //Encrypt password

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, "my tocken", { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

route.get("/", (req, res) => res.send("Api Running"));
module.exports = route;
