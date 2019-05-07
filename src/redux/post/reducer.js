import { LOAD_BULK, LOAD_ONE, SELECT_CATEGORY_ID_FOR_LIST, SELECT_TAG_ID_FOR_LIST } from './actionTypes';

const initialState = {
  posts: [],
  post: {},
  listCategoryId: '',
  listTagId: ''
}

export default (state = initialState, action) => {
  const { posts, post, listCategoryId, listTagId } = action;
  switch (action.type) {
    case LOAD_BULK: {
      return {
        ...state,
        posts: posts
      };
    }
    case LOAD_ONE: {
      return {
        ...state,
        post: post
      };
    }
    case SELECT_CATEGORY_ID_FOR_LIST: {
      return {
        ...state,
        listCategoryId: listCategoryId,
        listTagId: ''
      };
    }
    case SELECT_TAG_ID_FOR_LIST: {
      return {
        ...state,
        listCategoryId: '',
        listTagId: listTagId
      };
    }
    default: {
      return state;
    }
  }
}
