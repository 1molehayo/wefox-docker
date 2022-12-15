import IPost from 'models/Post';
import {
  CREATE_POST_FAIL,
  CREATE_POST_SUCCESS,
  CREATING_POST,
  FETCHING_POSTS,
  FETCH_POSTS_FAIL,
  FETCH_POSTS_SUCCESS,
  UPDATE_POST_FAIL,
  UPDATE_POST_SUCCESS,
  UPDATING_POST
} from 'utilities/constants';

const reducer = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any,
  action: {
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
        posts: action.posts
      };
    case FETCH_POSTS_FAIL:
      return { ...state, error: action.error, loading: false };

    case CREATING_POST:
      return { ...state, loading: true };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.singlePost]
      };
    case CREATE_POST_FAIL:
      return { ...state, error: action.error, updating: false };

    case UPDATING_POST:
      return { ...state, loading: true };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.singlePost]
      };
    case UPDATE_POST_FAIL:
      return { ...state, error: action.error, updating: false };

    default:
      throw new Error(`unknown action ${action.type}`);
  }
};

export default reducer;
