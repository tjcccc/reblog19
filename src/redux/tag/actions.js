import { LOAD_ALL } from './actionTypes';

export const loadTags = (tags) => ({
  type: LOAD_ALL,
  tags: tags
});
