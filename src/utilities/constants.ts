export const PAGE_SIZE = 10;

export const FETCHING_POSTS = 'FETCHING_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAIL = 'FETCH_POSTS_FAIL';

export const CREATING_POST = 'CREATING_POST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAIL = 'CREATE_POST_FAIL';

export const UPDATING_POST = 'UPDATING_POST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAIL = 'UPDATE_POST_FAIL';

export const DELETING_POST = 'DELETING_POST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAIL = 'DELETE_POST_FAIL';

export const SORT_POST = 'SORT_POST';

export const DEFAULT_PROPS = {
  center: {
    lat: 6.445944600000001,
    lng: 3.437407
  },
  zoom: 10
};

export const MAP_OPTIONS = {
  componentRestrictions: { country: 'ng' },
  fields: [
    'address_components',
    'geometry',
    'icon',
    'name',
    'formatted_address',
    'place_id',
    'plus_code'
  ],
  types: ['establishment']
};
