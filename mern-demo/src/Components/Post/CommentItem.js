import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment } from "../../Redux/Actions/Post";

import Moment from "react-moment";
const CommentItem = ({
  postId,
  comment: { _id, firstName, lastName, user, text, avatar, date },
  auth,
  deleteComment,
}) => {
  return (
    <Fragment>
      <div class="comments">
        <div class="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
              <img class="round-img" src={avatar} alt="" />
              <h4>{firstName + " " + lastName}</h4>
            </a>
          </div>
          <div>
            <p class="my-1">{text}</p>
            <p class="post-date">
              Posted on <Moment format="DD-MM-YYYY">{date}</Moment>
            </p>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={(e) => deleteComment(postId, _id)}
                className="btn btn-danger"
              >
                {" "}
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};
const MapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(MapStateToProps, { deleteComment })(CommentItem);
