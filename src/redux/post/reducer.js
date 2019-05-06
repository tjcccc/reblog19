import { LOAD_BULK, LOAD_ONE, SELECT_CATEGORY, SELECT_TAG } from './actionTypes';

const initialState = {
  posts: [],
  post: {},
  categoryId: '',
  tagId: ''
}

export default (state = initialState, action) => {
  const { posts, post, categoryId, tagId } = action;
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
    case SELECT_CATEGORY: {
      return {
        ...state,
        categoryId: categoryId
      };
    }
    case SELECT_TAG: {
      return {
        ...state,
        tagId: tagId
      };
    }
    default: {
      return state;
    }
  }
}
