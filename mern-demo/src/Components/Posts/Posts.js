import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../Redux/Actions/Post";
import PostItems from "./PostItems";
import PostForm from "./PostFrom";
import Spinner from "../../Components/Layouts/Spinner";
const Posts = ({ post: { posts, loading }, getPost }) => {
  useEffect(() => {
    getPost();
  }, [getPost]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fas-user">Welcome to the community</i>
      </p>
      {/* Post Form */}
      <PostForm />
      <div className="posts">
        {posts.map((post, index) => (
          <PostItems key={index} post={post} showActions={true}></PostItems>
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
};
const MapStateToProps = (state) => ({
  post: state.post,
});
export default connect(MapStateToProps, { getPost })(Posts);
