const express = require("express");
const PostController = require("../../controllers/PostController");
const Auth = require("../../middleware/auth");
const {
  postValidator,
  validate,
  commentValidator,
} = require("../../helpers/validators");
const router = express.Router();

// @route  api/post
// @method GET
// @access Public
router.get("/", Auth, PostController.getAllPost);

router.get("/:id", Auth, PostController.getSinglePost);

router.post("/", Auth, postValidator(), validate, PostController.createPost);

router.delete("/:id", Auth, PostController.deletePost);

router.put("/like/:id", Auth, PostController.likePost);

router.put("/unlike/:id", Auth, PostController.unlikePost);

router.post(
  "/comment/:id",
  Auth,
  commentValidator(),
  validate,
  PostController.addComments
);

router.delete("/comment/:postId/:commentId", Auth, PostController.deleteComment);

module.exports = router;
