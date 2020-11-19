import { LOAD_CONFIG } from './actionTypes';

const initialState = {
    // _id: '',
    // user_id: '',
    blogName: '',
    authorName: '',
    about: ''
}

export default (state = initialState, action) => {
  const { config } = action;
  switch (action.type) {
    case LOAD_CONFIG: {
      return {
        blogName: config.blog_name,
        authorName: config.author_name,
        about: config.about
      };
    }
    default: {
      return state;
    }
  }
}
