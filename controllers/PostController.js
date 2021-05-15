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

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check if post has already been liked
    const isLiked = post.likes.filter(
      (like) => like.user.toString() === req.user.id
    ).length;
    if (isLiked > 0) {
      return res.status(400).send({
        success: false,
        msg: "Post already liked",
      });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.status(200).send({
      success: true,
      likes: post.likes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      msg: "Server Error",
    });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    const isLiked = post.likes.filter(
      (like) => like.user.toString() === req.user.id
    ).length;
    if (isLiked === 0) {
      return res.status(400).send({
        success: false,
        msg: "Post has not yet been liked",
      });
    }
    const index = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(index, 1);
    await post.save();
    return res.status(200).send({
      success: true,
      likes: post.likes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      msg: "Server Error",
    });
  }
};

exports.addComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user.id).select("-password");
    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };
    post.comments.unshift(newComment);
    await post.save();
    return res.status(200).send({
      success: true,
      comments: post.comments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      msg: "Server Error",
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const post = await Post.findById(postId);
    const comment = post.comments.find((comment) => comment.id === commentId);

    // make sure comment exist
    if (!comment) {
      return res.status(404).send({
        success: false,
        msg: "Comment Not Found",
      });
    }

    // check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).send({
        success: false,
        msg: "User Not Authorise",
      });
    }

    const index = post.comments
      .map((comm) => comm.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(index, 1);
    await post.save();
    return res.status(200).send({
      success: true,
      comments: post.comments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      msg: "Server Error",
    });
  }
};
