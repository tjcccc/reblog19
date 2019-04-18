import { INTIALIZE } from './actionTypes';
import { UPDATE_ARTICLE } from './actionTypes';
import { UPDATE_CATEGORIES } from './actionTypes';
import { UPDATE_TAGS } from './actionTypes';
import { UPDATE_POST_STATE } from './actionTypes';

export const intialize = () => ({
  type: INTIALIZE,
  article: '',
  categories: [],
  tags: [],
  postState: 0
});

export const updateArticle = (article) => ({
  type: UPDATE_ARTICLE,
  article: article
});

export const updateCategories = (categories) => ({
  type: UPDATE_CATEGORIES,
  categories: categories
});

export const updateTags = (tags) => ({
  type: UPDATE_TAGS,
  tags: tags
});

export const updateState = (postState) => ({
  type: UPDATE_POST_STATE,
  postState: postState
});
