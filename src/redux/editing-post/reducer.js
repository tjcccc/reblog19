import { INITIALIZE, LOAD_POST } from './actionTypes';
import { UPDATE_TITLE } from './actionTypes';
import { UPDATE_CONTENT } from './actionTypes';
import { UPDATE_STATUS } from './actionTypes';
import { UPDATE_CATEGORIES } from './actionTypes';
import { UPDATE_TAGS } from './actionTypes';

const initialState = {
  id: '',
  title: '',
  content: '',
  status: 0,
  categories: [],
  tags: []
}

export default (state = initialState, action) => {
  const { title, content, status, categories, tags, post } = action;
  switch (action.type) {
    case INITIALIZE: {
      return state;
    }
    case UPDATE_TITLE: {
      return {
        ...state,
        title: title
      };
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
    case LOAD_POST: {
      return {
        ...state,
        post: post
        // id: post.id,
        // title: post.title,
        // content: post.content,
        // categories: post.categories,
        // tags: post.tags,
        // status: post.status
      }
    }
    default: {
      return state;
    }
  }
}
