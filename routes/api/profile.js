const express = require("express");
const router = express.Router();
const Auth = require("../../middleware/auth");
const ProfileController = require("../../controllers/ProfileController");
const {
  profileValidation,
  validate,
  experienceValidator,
  educationValidator,
} = require("../../helpers/validators");

// @route  api/profile/me
// @method GET
// @access Private
router.get("/me", Auth, ProfileController.getProfile);

router.post(
  "/",
  Auth,
  profileValidation(),
  validate,
  ProfileController.createProfile
);

router.get("/", ProfileController.getAllProfiles);

router.get("/user/:id", ProfileController.getProfileByUserId);

router.put(
  "/experience",
  Auth,
  experienceValidator(),
  validate,
  ProfileController.addExperience
);

router.put(
  "/education",
  Auth,
  educationValidator(),
  validate,
  ProfileController.addEducation
);

router.delete("/", Auth, ProfileController.deleteProfile);

router.delete(
  "/experience/:experienceId",
  Auth,
  ProfileController.deleteExperience
);

router.delete(
  "/education/:educationId",
  Auth,
  ProfileController.deleteEducation
);

router.get("/github/:username", ProfileController.gitHubProfile);

module.exports = router;
