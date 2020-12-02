const express = require("express");
const route = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Profile = require("../DB/Profile");
const User = require("../DB/User");
const Post = require("../DB/Post");
// @route  GET api/profile/me
//@desc    Get current user profile
//@access  private

route.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["firstName", "lastName", "avatar"]);
    if (!profile) {
      return res.status(500).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
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
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      // user,
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

// @route  GET api/profile
//@desc    Get All Profile
//@access  Public

route.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "firstName",
      "lastName",
      "avatar",
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  GET api/profile/user/:user_id
//@desc    Get Profile by user id
//@access  Public

route.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["firstName", "lastName", "avatar"]);
    if (!profile) return res.status(400).json({ msg: "Profile Not Found" });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile Not Found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route  DELETE api/profile
//@desc    Delete profile user and post
//@access  Private

route.delete("/", auth, async (req, res) => {
  try {
    // remove user posts
    await Post.deleteMany({ user: req.user.id });
    // remove profile

    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findByIdAndRemove({ _id: req.user.id });
    res.json({ msg: "User Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  PUT api/profile/experience
//@desc    Add Profile exeperience
//@access  Private

route.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title Is Required").not().isEmpty(),
      check("company", "Company Is Required").not().isEmpty(),
      check("from", "From date Is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  DELETE api/profile/experience/:exp_id
//@desc    Delete Exeperience From Profile
//@access  Private

route.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
// @route  PUT api/profile/education
//@desc    Add Profile exeperience
//@access  Private

route.put(
  "/education",
  [
    auth,
    [
      check("school", "School Is Required").not().isEmpty(),
      check("degree", "degree Is Required").not().isEmpty(),
      check("field", "Field Is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { school, degree, field, from, to, current, description } = req.body;
    const newEdu = {
      school,
      degree,
      field,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);
// @route  DELETE api/profile/education/:edu_id
//@desc    Delete Education From Profile
//@access  Private
route.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    console.log(profile);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = route;
