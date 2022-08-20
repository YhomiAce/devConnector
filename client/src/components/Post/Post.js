/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPostById } from "../../actions/post";
import Spinner from "../layouts/Spinner";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";


const Post = ({ getPostById, post: { loading, post }, match }) => {
  useEffect(() => {
    getPostById(match.params.id);
  }, []);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
        <Link to="/posts">Back To Posts</Link>
      <PostItem post={post} showAction={false} />
    </Fragment>
  );
};

Post.propTypes = {
  getPostById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPostById })(Post);
