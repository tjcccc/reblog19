import { INTIALIZE } from './actionTypes';
import { UPDATE_ARTICLE } from './actionTypes';
import { UPDATE_CATEGORIES } from './actionTypes';
import { UPDATE_TAGS } from './actionTypes';
import { UPDATE_POST_STATE } from './actionTypes';

const initialState = {
  article: '',
  postState: 0,
  categories: [],
  tags: []
}

export default (state = initialState, action) => {
  const { article, postState, categories, tags } = action;
  switch (action.type) {
    case INTIALIZE: {
      return state;
    }
    case UPDATE_ARTICLE: {
      return {
        ...state,
        article: article
      };
    }
    case UPDATE_CATEGORIES: {
      return {
        ...state,
        categories: categories
      };
    }
    case UPDATE_TAGS: {
      return {
        ...state,
        tags: tags
      };
    }
    case UPDATE_POST_STATE: {
      return {
        ...state,
        postState: postState
      };
    }
    default: {
      return state;
    }
  }
}
