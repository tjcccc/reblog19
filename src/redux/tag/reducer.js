import { LOAD_ALL } from './actionTypes';

const initialState = {
  tags: []
}

export default (state = initialState, action) => {
  const { tags } = action;
  switch (action.type) {
    case LOAD_ALL: {
      return {
        tags: tags
      };
    }
    default: {
      return state;
    }
  }
}
