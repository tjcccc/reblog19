import { TEST_HEADER } from './header.actionTypes';

const initialState = {
  isAdmin: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TEST_HEADER: {
      return {
        isAdmin: true
      };
    }
    default: {
      return state;
    }
  }
}
