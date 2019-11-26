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
    });
  }
  catch (error) {
    throw new Error(error);
  }
};

const fetchPostsByDate = async (year, month, day = null, status = null) => {
  const requestDay = day === null || day === undefined ? 0 : day;
  const requestStatus = status === null || status === undefined ? 1 : status;
  const requestBody = {
    query: `
      query {
        postsByDate(year: ${year}, month: ${month}, day: ${requestDay}, status: ${requestStatus}) {
          _id
          title
          create_time
          post_time
          update_time
          content
          status
          category_ids
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
    });
  }
  catch (error) {
    throw new Error(error);
  }
};

const fetchPostsWithNoCategory = async (skip, limit, status = null) => {
  const requestBody = {
    query: `
      query {
        postsWithNoCategory(skip: ${skip}, limit: ${limit}, status: ${status}) {
          _id
          title
          create_time
          post_time
          update_time
          content
          status
          category_ids
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
    });
  }
  catch (error) {
    throw new Error(error);
  }
};

const fetchUncategorizedPostsCount = async (status = null) => {
  const requestBody = {
    query: `
      query {
        uncategorizedPostsCount(status: ${status})
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
}

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
        post(_id: "${id}") {
          _id
          title
          create_time
          post_time
          update_time
          content
          status
          category_ids
          tags
          view_count
          like_count
          categories {
            _id
            order_id
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

const fetchEarliestPost = async () => {
  const requestBody = {
    query: `
      query {
        earliestPost {
          _id,
          post_time
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
}

const checkIfPostExistsById = async (id) => {
  const requestBody = {
    query: `
      query {
        postExistence(_id: "${id}")
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
  // console.log(newPost.categories);
  // console.log(newPost.tags);
  const requestBody = {
    query: `
      mutation($title: String, $content: String, $status: Int, $category_ids: [ID], $tags: [String]) {
        createPost(newPost: {
          title: $title,
          content: $content,
          status: $status,
          category_ids: $category_ids,
          tags: $tags }) {
          _id
        }
      }
    `,
    variables: {
      title: newPost.title,
      content: newPost.content,
      status: newPost.status,
      category_ids: newPost.category_ids,
      tags: newPost.tags
    }
  };
  // console.log(newPost.categories.map(category => category._id));
  // console.log(JSON.stringify(requestBody));
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

const updatePost = async (post) => {
  const requestBody = {
    query: `
      mutation($_id: ID, $title: String, $content: String, $status: Int, $category_ids: [ID], $tags: [String]) {
        updatePost(post: {
          _id: $_id,
          title: $title,
          content: $content,
          status: $status,
          category_ids: $category_ids,
          tags: $tags
        }) {
          _id
          title
          content
        }
      }
    `,
    variables: {
      _id: post._id,
      title: post.title,
      content: post.content,
      status: post.status,
      category_ids: post.category_ids,
      tags: post.tags
    }
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
}

export {
  fetchPosts,
  fetchPostsByDate,
  fetchPostsByCategory,
  fetchPostsWithNoCategory,
  fetchUncategorizedPostsCount,
  fetchPostsByTag,
  fetchPostById,
  fetchEarliestPost,
  checkIfPostExistsById,
  createPost,
  updatePost
};
