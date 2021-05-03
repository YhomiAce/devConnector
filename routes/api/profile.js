const express = require('express');
const router = express.Router();
const Auth = require('../../middleware/auth');
const ProfileController = require('../../controllers/ProfileController');
const {profileValidation, validate} = require("../../helpers/validators");

// @route  api/profile/me
// @method GET
// @access Private
router.get('/me', Auth, ProfileController.getProfile );

router.post("/",Auth, profileValidation(), validate, ProfileController.createProfile);

router.get("/", ProfileController.getAllProfiles);

router.get("/user/:id", ProfileController.getProfileByUserId);

router.delete("/",Auth, ProfileController.deleteProfile);

module.exports = router;