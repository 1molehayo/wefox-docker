/* eslint-disable no-unused-vars */
import IPost from './Post';
import sortState from './SortState';

interface IPostContext {
  createPost: (post: IPost) => void;
  error: string;
  fetchPosts: () => void;
  filteredPosts: IPost[];
  loading: boolean;
  posts: IPost[];
  removePost: (id: number) => void;
  singlePost?: IPost;
  sortByColumn: (column: string) => void;
  sorting: boolean;
  sortState: sortState[];
  success: string;
  updatePosts: (post: IPost) => void;
  updating: boolean;
}

export default IPostContext;
