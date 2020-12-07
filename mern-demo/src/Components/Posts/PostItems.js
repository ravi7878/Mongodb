import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { likePost, unLikePost, deletePost } from "../../Redux/Actions/Post";
const PostItems = ({
  post,
  post: { _id, text, user, firstName, lastName, avatar, date, likes, comments },
  auth,
  likePost,
  deletePost,
  unLikePost,
  showActions,
}) => {
  return (
    <Fragment>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img className="round-img" src={avatar} alt="" />
            <h4>{firstName + " " + lastName}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on <Moment format="DD-MM-YYYY">{date}</Moment>
          </p>
          {showActions && (
            <Fragment>
              <button
                onClick={(e) => likePost(_id)}
                type="button"
                className="btn btn-light"
              >
                <i className="fas fa-thumbs-up"></i>
                {likes.length > 0 && <span> {likes.length}</span>}
              </button>
              <button
                onClick={(e) => unLikePost(_id)}
                type="button"
                className="btn btn-light"
              >
                <i className="fas fa-thumbs-down"></i>
              </button>
              <Link to={`/${_id}`} className="btn btn-primary">
                Discussion{" "}
                {comments.length > 0 && (
                  <span className="comment-count"> {comments.length}</span>
                )}
              </Link>
              {!auth.loading && user === auth.user._id && (
                <button
                  type="button"
                  onClick={(e) => deletePost(_id)}
                  className="btn btn-danger"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

PostItems.propTypes = {
  post: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  showActions: PropTypes.bool.isRequired,
  likePost: PropTypes.func.isRequired,
  unLikePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};
const MapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(MapStateToProps, { likePost, unLikePost, deletePost })(
  PostItems
);
