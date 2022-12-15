/* eslint-disable no-unused-vars */
import React from 'react';
import IPost from 'models/Post';
import axios from 'services/axios';
import {
  CREATE_POST_FAIL,
  CREATE_POST_SUCCESS,
  CREATING_POST,
  DELETE_POST_FAIL,
  DELETE_POST_SUCCESS,
  DELETING_POST,
  FETCHING_POSTS,
  FETCH_POSTS_FAIL,
  FETCH_POSTS_SUCCESS,
  UPDATE_POST_FAIL,
  UPDATE_POST_SUCCESS,
  UPDATING_POST
} from 'utilities/constants';
import reducer from './Posts.reducer';

interface IPostContext {
  createPost: (post: IPost) => void;
  error: string;
  fetchPosts: () => void;
  loading: boolean;
  posts: IPost[];
  removePost: (id: number) => void;
  singlePost?: IPost;
  success: string;
  updatePosts: (post: IPost) => void;
  updating: boolean;
}

const ContextDefaultValues: IPostContext = {
  createPost: () => null,
  error: '',
  fetchPosts: () => [],
  loading: false,
  posts: [],
  removePost: () => null,
  singlePost: undefined,
  success: '',
  updatePosts: () => null,
  updating: false
};

export const PostContext =
  React.createContext<IPostContext>(ContextDefaultValues);

interface IProps {
  children: React.ReactNode;
}

const PostContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = React.useReducer(reducer, ContextDefaultValues);

  const fetchPosts = () => {
    return new Promise<void>((resolve, reject) => {
      dispatch({ type: FETCHING_POSTS });

      axios
        .get('/')
        .then((response) => {
          dispatch({
            type: FETCH_POSTS_SUCCESS,
            posts: response.data
          });
          resolve();
        })
        .catch((error) => {
          reject(error);
          dispatch({
            type: FETCH_POSTS_FAIL,
            error: 'There was an error while fetching data'
          });
        });
    });
  };

  const createPost = (newPost: IPost) => {
    return new Promise<void>((resolve, reject) => {
      dispatch({ type: CREATING_POST });

      axios
        .post('/', newPost)
        .then((response) => {
          dispatch({
            type: CREATE_POST_SUCCESS,
            singlePost: response.data
          });
          resolve();
        })
        .catch((error) => {
          reject(error);
          dispatch({
            type: CREATE_POST_FAIL,
            error: 'There was an error while creating data'
          });
        });
    });
  };

  const updatePosts = (newPost: IPost) => {
    return new Promise<void>((resolve, reject) => {
      dispatch({ type: UPDATING_POST });

      axios
        .get('/')
        .then(() => {
          const newPosts = state.posts.map((item: IPost) => {
            if (item.id === newPost.id) {
              return newPost;
            }
            return item;
          });
          dispatch({
            type: UPDATE_POST_SUCCESS,
            posts: [...newPosts]
          });
          resolve();
        })
        .catch((error) => {
          reject(error);
          dispatch({
            type: UPDATE_POST_FAIL,
            error: 'There was an error while updating data'
          });
        });
    });
  };

  const removePost = (id: number) => {
    return new Promise<void>((resolve, reject) => {
      dispatch({ type: DELETING_POST });

      axios
        .get('/')
        .then(() => {
          dispatch({
            type: DELETE_POST_SUCCESS,
            posts: state.posts.filter((item: IPost) => item.id !== id)
          });
          resolve();
        })
        .catch((error) => {
          reject(error);
          dispatch({
            type: DELETE_POST_FAIL,
            error: 'There was an error while deleting data'
          });
        });
    });
  };

  return (
    <PostContext.Provider
      value={{ ...state, createPost, fetchPosts, removePost, updatePosts }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
