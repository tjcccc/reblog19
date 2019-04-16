import { LOAD_ALL } from './actionTypes';

export const loadCategories = (categories) => ({
  type: LOAD_ALL,
  categories: categories
});
