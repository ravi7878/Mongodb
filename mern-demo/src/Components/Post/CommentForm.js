import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../Redux/Actions/Post";
import axios from "axios";
const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    addComment(postId, { text });
    setText("");
  };

  return (
    <Fragment>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave a comment...</h3>
        </div>
        <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add Comment "
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </Fragment>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
