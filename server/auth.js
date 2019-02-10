const jwt = require('jsonwebtoken');

/*---------------------------------------
    Checks to see if the JWT token is valid
--------------------------------------------*/
const validAuthorization = token => {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return false;
  }

  return true;
};

/*---------------------------------------
    Generates a new JWT token
--------------------------------------------*/
const generateAuthToken = username => ({
  token: jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '8h' }),
});

/*---------------------------------------
    Retrieves the username from the JWT token
--------------------------------------------*/
const getUsername = token => {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data.username;
  } catch (err) {
    return false;
  }
};

module.exports = {
  validAuthorization,
  generateAuthToken,
  getUsername,
};
