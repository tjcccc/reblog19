const jwt = require('jsonwebtoken');
const { secretKey } = require('../keys');

const isAuthorized = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuthorized = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuthorized = false;
    return next();
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, secretKey);
  }
  catch (err) {
    req.isAuthorized = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuthorized = false;
    return next();
  }

  req.isAuthorized = true;
  req.userId = decodedToken.userId;
  next();

}

module.exports.isAuthorized = isAuthorized;
