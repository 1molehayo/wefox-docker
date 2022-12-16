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
  SORT_POST,
  UPDATE_POST_FAIL,
  UPDATE_POST_SUCCESS,
  UPDATING_POST
} from 'utilities/constants';
import reducer from './Posts.reducer';
import IPostContext from 'models/IPostContext';
import sortState from 'models/SortState';

const ContextDefaultValues: IPostContext = {
  createPost: () => null,
  error: '',
  fetchPosts: () => [],
  filteredPosts: [],
  loading: false,
  posts: [],
  removePost: () => null,
  singlePost: undefined,
  sortByColumn: () => null,
  sorting: false,
  sortState: [
    {
      label: 'Title',
      dir: 'asc',
      active: true
    },
    {
      label: 'Content',
      dir: null,
      active: false
    },
    {
      label: 'Date',
      dir: null,
      active: false
    }
  ],
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

  const sortBy = (a: any, b: any, field: string) => {
    if (a[field] < b[field]) {
      return -1;
    }
    if (a[field] > b[field]) {
      return 1;
    }
    return 0;
  };

  const sortByColumn = (column: string) => {
    const { sortState, posts } = state;
    const value = sortState[column as keyof typeof sortState];

    const sortedPosts = posts.sort((a: any, b: any) => sortBy(a, b, column));

    if (value !== 'asc') {
      dispatch({
        type: SORT_POST,
        posts: sortedPosts.reverse()
      });
    } else {
      dispatch({
        type: SORT_POST,
        posts: posts.sort((a: any, b: any) => sortBy(a, b, column))
      });
    }
  };

  const sortPostsByCurrent = (postData: IPost[]) => {
    const { sortState } = state;
    const obj: sortState = sortState.filter(
      (item: sortState) => item.active
    )[0];
    return postData.sort((a: any, b: any) => sortBy(a, b, obj.label));
  };

  const fetchPosts = () => {
    return new Promise<void>((resolve, reject) => {
      dispatch({ type: FETCHING_POSTS });

      axios
        .get('/')
        .then((response) => {
          dispatch({
            type: FETCH_POSTS_SUCCESS,
            filteredPosts: sortPostsByCurrent(response.data),
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
          const newPosts = [...state.posts, response.data];
          dispatch({
            type: CREATE_POST_SUCCESS,
            filteredPosts: sortPostsByCurrent(newPosts),
            posts: newPosts
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
      const obj = { ...newPost };
      delete obj.id;

      axios
        .put(`/${newPost.id}`, obj)
        .then((response) => {
          const newPosts = state.posts.map((item: IPost) => {
            if (item.id === newPost.id) {
              return response.data;
            }
            return item;
          });

          dispatch({
            type: UPDATE_POST_SUCCESS,
            filteredPosts: sortPostsByCurrent(newPosts),
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
      const newPosts = state.posts.filter((item: IPost) => item.id !== id);

      axios
        .delete(`/${id}`)
        .then(() => {
          dispatch({
            type: DELETE_POST_SUCCESS,
            filteredPosts: sortPostsByCurrent(newPosts),
            posts: [...newPosts]
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
      value={{
        ...state,
        createPost,
        fetchPosts,
        removePost,
        sortByColumn,
        updatePosts
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
