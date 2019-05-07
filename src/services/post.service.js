import axios from 'axios';
import serverConfig from '../config/server';

const fetchPosts = async (skip, limit, status = null) => {
  const requestBody = {
    query: `
      query {
        posts(skip: ${skip}, limit: ${limit}, status: ${status}) {
          _id
          title
          create_time
          post_time
          update_time
          content
          status
          categories
          tags
          view_count
          like_count
        }
      }
    `
  };
  try {
    return await axios.post(serverConfig.graphQL, JSON.stringify(requestBody), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  catch (error) {
    throw new Error(error);
  }
};

const fetchPostsByCategory = async (skip, limit, categoryId, status = null) => {
  const requestBody = {
    query: `
      query {
        postsByCategory(skip: ${skip}, limit: ${limit}, categoryId: "${categoryId}", status: ${status}) {
          _id
          title
          create_time
          post_time
          update_time
          content
          status
          categories
          tags
          view_count
          like_count
        }
      }
    `
  };
  try {
    return await axios.post(serverConfig.graphQL, JSON.stringify(requestBody), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  catch (error) {
    throw new Error(error);
  }
};

const fetchPostsByTag = async (skip, limit, tagId, status = null) => {
  const requestBody = {
    query: `
      query {
        postsByTag(skip: ${skip}, limit: ${limit}, tagId: "${tagId}", status: ${status}) {
          _id
          title
          create_time
          post_time
          update_time
          content
          status
          categories
          tags
          view_count
          like_count
        }
      }
    `
  };
  try {
    return await axios.post(serverConfig.graphQL, JSON.stringify(requestBody), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  catch (error) {
    throw new Error(error);
  }
};

const fetchPostById = async (id) => {
  const requestBody = {
    query: `
      query {
        post(id: ${id}) {
          _id
          title
          create_time
          post_time
          update_time
          content
          status
          categories
          tags
          view_count
          like_count
        }
      }
    `
  };
  try {
    return await axios.post(serverConfig.graphQL, JSON.stringify(requestBody), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  catch (error) {
    throw new Error(error);
  }
};

export {
  fetchPosts,
  fetchPostsByCategory,
  fetchPostsByTag,
  fetchPostById
};
