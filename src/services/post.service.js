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
          category_ids
          tag_ids
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
    });
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
          category_ids
          tag_ids
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
    });
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
          category_ids
          tag_ids
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
    });
  }
  catch (error) {
    throw new Error(error);
  }
};

const fetchPostById = async (id) => {
  const requestBody = {
    query: `
      query {
        post(id: "${id}") {
          _id
          title
          create_time
          post_time
          update_time
          content
          status
          category_ids
          tag_ids
          view_count
          like_count,
          categories {
            _id
            order_id
            label
            count
          },
          tags {
            _id
            label
            count
          }
        }
      }
    `
  };
  try {
    return await axios.post(serverConfig.graphQL, JSON.stringify(requestBody), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  catch (error) {
    throw new Error(error);
  }
};

const createPost = async (newPost) => {
  console.log(newPost.categories);
  console.log(newPost.tags);
  const requestBody = {
    query: `
      mutation($title: String, $content: String, $status: Int, $categories: [ID], $tags: [ID]) {
        createPost(newPost: {
          title: $title,
          content: $content,
          status: $status,
          categories: $categories,
          tags: $tags}) {
          _id
        }
      }
    `,
    variables: {
      title: newPost.title,
      content: newPost.content,
      status: newPost.status,
      categories: newPost.categories.map(category => category._id),
      tags: newPost.tags
    }
  };
  console.log(newPost.categories.map(category => category._id));
  console.log(JSON.stringify(requestBody));
  try {
    return await axios.post(serverConfig.graphQL, JSON.stringify(requestBody), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  catch (error) {
    throw new Error(error);
  }
}

export {
  fetchPosts,
  fetchPostsByCategory,
  fetchPostsByTag,
  fetchPostById,
  createPost
};
