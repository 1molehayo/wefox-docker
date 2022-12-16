import IPost from 'models/Post';
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

const reducer = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any,
  action: {
    filteredPosts?: IPost[];
    type: string;
    posts?: IPost[];
    error?: string;
    success?: string;
    singlePost?: IPost;
  }
) => {
  switch (action.type) {
    case FETCHING_POSTS:
      return { ...state, loading: true };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.posts,
        filteredPosts: action.filteredPosts
      };
    case FETCH_POSTS_FAIL:
      return { ...state, error: action.error, loading: false };

    case CREATING_POST:
    case UPDATING_POST:
    case DELETING_POST:
      return { ...state, updating: true };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        updating: false,
        filteredPosts: [...state.posts, action.singlePost],
        posts: [...state.posts, action.singlePost]
      };
    case CREATE_POST_FAIL:
      return { ...state, error: action.error, updating: false };

    case UPDATE_POST_SUCCESS:
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        updating: false,
        posts: action.posts
      };
    case UPDATE_POST_FAIL:
      return { ...state, error: action.error, updating: false };

    case DELETE_POST_FAIL:
      return { ...state, error: action.error, updating: false };

    case SORT_POST:
      return {
        ...state,
        sorting: false,
        posts: action.posts
      };

    default:
      throw new Error(`unknown action ${action.type}`);
  }
};

export default reducer;
