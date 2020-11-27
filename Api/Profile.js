const express = require("express");
const route = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Profile = require("../DB/Profile");
const User = require("../DB/User");
const { Router } = require("express");

// @route  GET api/profile/me
//@desc    Get current user profile
//@access  private

route.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["firstName", "lastName"]);
    if (!profile) {
      return res.status(500).json({ msg: "There is no profile for this user" });
    }
    res.send(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/profile
//@desc    Create or update user profile
//@access  private

route.post(
  "/",
  [
    auth,
    [
      check("status", "status is reqired").not().isEmpty(),
      check("skills", "skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
      //   return res.status(400).json({ errors: errors.array() });
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      user,
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubUsername,
      facebook,
      youtube,
      instagram,
      linkedin,
    } = req.body;

    //Build Profile Object
    const profileField = {};
    profileField.user = req.user.id;
    if (company) profileField.company = company;
    if (website) profileField.website = website;
    if (location) profileField.location = location;
    if (status) profileField.status = status;
    if (bio) profileField.bio = bio;
    if (githubUsername) profileField.githubUsername = githubUsername;
    if (skills) {
      profileField.skills = skills.split(",").map((skill) => skill.trim());
    }
    //Build social object
    profileField.social = {};
    if (youtube) profileField.social.youtube = youtube;
    if (facebook) profileField.social.facebook = facebook;
    if (linkedin) profileField.social.linkedin = linkedin;
    if (instagram) profileField.social.instagram = instagram;

    console.log(profileField);
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      //Update
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileField },
          { new: true }
        );
        return res.json(profile);
      }
      //Create
      profile = new Profile(profileField);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = route;
