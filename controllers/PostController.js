const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });

    const post = await newPost.save();
    return res.status(200).send({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      msg: "Server Error",
    });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      msg: "Server Error",
    });
  }
};

exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send({
        success: false,
        msg: "Post not found",
      });
    }
    return res.status(200).send({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);
    if (!error.kind === "ObjectId") {
      return res.status(404).send({
        success: false,
        msg: "Post not found",
      });
    }
    return res.status(500).send({
      success: false,
      msg: "Server Error",
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check post exist
    if (!post) {
      return res.status(404).send({
        success: false,
        msg: "Post not found",
      });
    }
    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).send({
        success: false,
        msg: "User not Authorised",
      });
    }
    await post.remove();
    return res.status(200).send({
      success: true,
      msg: "Post deleted",
    });
  } catch (error) {
    console.error(error);
    if (!error.kind === "ObjectId") {
      return res.status(404).send({
        success: false,
        msg: "Post not found",
      });
    }
    return res.status(500).send({
      success: false,
      msg: "Server Error",
    });
  }
};
