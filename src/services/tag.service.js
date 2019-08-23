import axios from 'axios';
import serverConfig from '../config/server';

const fetchTags = async () => {
  const requestBody = {
    query: `
      query {
        tags {
          _id,
          label,
          count
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

const fetchTagById = async (id) => {
  const requestBody = {
    query: `
      query {
        tag(id: ${id}) {
          _id,
          label,
          count
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

export {
  fetchTags,
  fetchTagById
};
