import { INTIALIZE } from './actionTypes';
import { UPDATE_CONTENT } from './actionTypes';
import { UPDATE_STATUS } from './actionTypes';
import { UPDATE_CATEGORIES } from './actionTypes';
import { UPDATE_TAGS } from './actionTypes';

const initialState = {
  content: '',
  status: 0,
  categories: [],
  tags: []
}

export default (state = initialState, action) => {
  const { content, status, categories, tags } = action;
  switch (action.type) {
    case INTIALIZE: {
      return state;
    }
    case UPDATE_CONTENT: {
      return {
        ...state,
        content: content
      };
    }
    case UPDATE_STATUS: {
      return {
        ...state,
        status: status
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
    default: {
      return state;
    }
  }
}
