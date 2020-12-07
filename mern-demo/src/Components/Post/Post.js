import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPostById } from "../../Redux/Actions/Post";
import Spinner from "../Layouts/Spinner";
import PostItems from "../Posts/PostItems";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
const Post = ({ getPostById, post: { post, loading }, match }) => {
  useEffect(() => {
    getPostById(match.params.id);
  }, [getPostById]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="posts">
        <Link to="/posts" className="btn btn-primary">
          Back To Home
        </Link>
        <PostItems post={post} showActions={false}></PostItems>
        <CommentForm postId={post._id} />
        <div className="comments">
          {post.comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPostById: PropTypes.func.isRequired,
};
const MapStateToProps = (state) => ({
  post: state.post,
});
export default connect(MapStateToProps, { getPostById })(Post);
