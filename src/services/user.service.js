import axios from 'axios';
import serverConfig from '../config/server';

const getAuthorization = async (mail, password) => {
  const requestBody = {
    query: `
      query {
        login(mail: "${mail}", password: "${password}") {
          userId,
          userLevel,
          isLoginSuccessful,
          loginTime,
          token,
          tokenExpiration
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

export {
  getAuthorization
};
