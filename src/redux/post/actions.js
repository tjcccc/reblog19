import { LOAD_BULK, LOAD_ONE, SELECT_CATEGORY_ID_FOR_LIST, SELECT_TAG_ID_FOR_LIST } from './actionTypes';

export const loadPosts = (posts) => ({
  type: LOAD_BULK,
  posts: posts
});

export const loadOnePost = (post) => ({
  type: LOAD_ONE,
  post: post
});

export const selectCategoryId = (categoryId) => ({
  type: SELECT_CATEGORY_ID_FOR_LIST,
  listCategoryId: categoryId
})

export const selectTagId = (tagId) => ({
  type: SELECT_TAG_ID_FOR_LIST,
  listTagId: tagId
})
