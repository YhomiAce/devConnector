const express = require("express");
const PostController = require("../../controllers/PostController");
const Auth = require("../../middleware/auth");
const { postValidator, validate } = require("../../helpers/validators");
const router = express.Router();

// @route  api/post
// @method GET
// @access Public
router.get("/", Auth, PostController.getAllPost);

router.get("/:id", Auth, PostController.getSinglePost);

router.post("/", Auth, postValidator(), validate, PostController.createPost);

router.delete("/:id", Auth, PostController.deletePost);

module.exports = router;
