import axios from 'axios';
import serverConfig from '../config/server';

const fetchPosts = async (skip, limit) => {
  const requestBody = {
    query: `
      query {
        posts(skip: ${skip}, limit: ${limit}) {
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
  fetchPosts
};
