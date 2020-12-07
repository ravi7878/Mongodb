import {
  GET_POSTS,
  GET_POST,
  POST_ERRORS,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "./types";
import axios from "axios";
import { setAlert } from "./Alert";

// GET Post

export const getPost = () => async (dispatch) => {
  try {
    const res = await axios.get("api/post");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
//GET Post By id
export const getPostById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/post/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
// ADD LIKE
export const likePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`api/post/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// REMOVE LIKE
export const unLikePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`api/post/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
// ADD Post

export const addPost = (formData) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("api/post", formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert("Post Added Successfully", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete Post

export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/post/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: {
        msg: err.response,
        status: err.response,
      },
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      `api/post/comment/${postId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("Comment Added ", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//DELETE comment

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/post/comment/${postId}/${commentId}`);
    dispatch({
      type: DELETE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
