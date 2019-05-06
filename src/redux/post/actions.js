import { LOAD_BULK, LOAD_ONE, SELECT_CATEGORY, SELECT_TAG } from './actionTypes';

export const loadPosts = (posts) => ({
  type: LOAD_BULK,
  posts: posts
});

export const loadOnePost = (post) => ({
  type: LOAD_ONE,
  post: post
});

export const selectCategory = (categoryId) => ({
  type: SELECT_CATEGORY,
  categoryId: categoryId
})

export const selectTag = (tagId) => ({
  type: SELECT_TAG,
  tagId: tagId
})
