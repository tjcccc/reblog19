import axios from 'axios';
import serverConfig from '../config/server';

const fetchCategories = async () => {
  const requestBody = {
    query: `
      query {
        categories {
          _id
          order_id,
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
    })
  }
  catch (error) {
    throw new Error(error);
  }
};

export {
  fetchCategories
};
