import axios from 'axios';
import serverConfig from '../config/server';

const fetchConfig = async () => {
  const requestBody = {
    query: `
      query {
        config {
          _id
          user_id
          blog_name
          author_name
          about
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

const updateAboutPage = async (aboutContent) => {
  const requestBody = {
    query: `
      mutation($about: String) {
        updateAbout(about: $about) {
          about
        }
      }
    `,
    variables: {
      about: aboutContent
    }
  };
  try {
    return await axios.post(serverConfig.graphQL, JSON.stringify(requestBody), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    throw new Error(error);
  }
};

export {
  fetchConfig,
  updateAboutPage
};

