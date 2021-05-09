const Profile = require("../models/Profile");
const User = require("../models/User");
const request = require("request");
const config = require("config");

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(404).send({
        success: false,
        message: "Profile Not Found",
      });
    }
    return res.status(200).send({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

exports.createProfile = async (req, res) => {
  try {
    const {
      skills,
      githubUsername,
      bio,
      status,
      company,
      website,
      location,
      youtube,
      twitter,
      facebook,
      linkedIn,
      instagram,
    } = req.body;
    // build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (website) profileFields.website = website;
    if (githubUsername) profileFields.githubUsername = githubUsername;
    if (location) profileFields.location = location;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }
    //    console.log(profileFields.skills);
    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedIn) profileFields.social.linkedIn = linkedIn;

    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      // update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.status(200).send({
        success: true,
        profile,
      });
    }

    // Create
    profile = new Profile(profileFields);
    await profile.save();

    return res.status(200).send({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    return res.status(200).send({
      success: true,
      profiles,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(404).send({
        success: false,
        message: "Profile Not Found",
      });
    }
    return res.status(200).send({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(404).send({
        success: false,
        message: "Profile Not Found",
      });
    }
    res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    // Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    return res.status(200).send({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

exports.addExperience = async (req, res) => {
  try {
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
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);
    await profile.save();
    return res.status(200).send({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const { experienceId } = req.params;
    let profile = await Profile.findOne({ user: req.user.id });
    // profile = profile.experience.filter((exp) => exp.id !== experienceId);
    // OR get the index and remove it from the array
    const index = profile.experience
      .map((item) => item.id)
      .indexOf(experienceId);
    profile.experience.splice(index, 1);
    await profile.save();
    return res.status(200).send({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

exports.addEducation = async (req, res) => {
  try {
    const {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEd = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    };
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEd);
    await profile.save();
    return res.status(200).send({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    const { educationId } = req.params;
    let profile = await Profile.findOne({ user: req.user.id });
    // profile = profile.education.filter((edu) => edu.id !== educationId);
    // OR get the index and remove it from the array
    const index = profile.education.map((item) => item.id).indexOf(educationId);
    profile.education.splice(index, 1);
    await profile.save();
    return res.status(200).send({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

exports.gitHubProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const options = {
      uri: `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "GITHUB_CLIENTID"
      )}&client_secret=${config.get("GITHUB_SECRET")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (err, response, body) => {
      if (err) console.error(err);
      if (response.statusCode !== 200) {
        return res.status(404).send({
          success: false,
          msg: "No Github Profile found",
        });
      }
      return res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};
