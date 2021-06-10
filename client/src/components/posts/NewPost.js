import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const NewPost = ({ addPost }) => {
  const [text, setText] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    addPost({ text });
    setText("");
  };
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Post Something...</h3>
      </div>
      <form className="form my-1" onSubmit={submitHandler}>
        <textarea
          name="text"
          cols="30"
          value={text}
          rows="5"
          placeholder="Create a post"
          required
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

NewPost.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(NewPost);
