import { INTIALIZE } from './actionTypes';
import { UPDATE_CONTENT } from './actionTypes';
import { UPDATE_STATUS } from './actionTypes';
import { UPDATE_CATEGORIES } from './actionTypes';
import { UPDATE_TAGS } from './actionTypes';

export const intialize = () => ({
  type: INTIALIZE,
  content: '',
  categories: [],
  tags: [],
  status: 0
});

export const updateContent = (content) => ({
  type: UPDATE_CONTENT,
  content: content
});

export const updateStatus = (status) => ({
  type: UPDATE_STATUS,
  status: status
});

export const updateCategories = (categories) => ({
  type: UPDATE_CATEGORIES,
  categories: categories
});

export const updateTags = (tags) => ({
  type: UPDATE_TAGS,
  tags: tags
});
