import { LOAD_ALL } from './actionTypes';

const initialState = {
  categories: []
}

export default (state = initialState, action) => {
  const { categories } = action;
  switch (action.type) {
    case LOAD_ALL: {
      return {
        categories: categories
      };
    }
    default: {
      return state;
    }
  }
}
