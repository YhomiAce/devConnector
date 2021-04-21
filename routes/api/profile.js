const express = require('express');
const router = express.Router();
const Auth = require('../../middleware/auth');
const ProfileController = require('../../controllers/ProfileController');

// @route  api/profile/me
// @method GET
// @access Private
router.get('/me', Auth, ProfileController.getProfile );

router.get("/test",(req,res)=>{
    res.send("Test with ma nigga");
})

module.exports = router;