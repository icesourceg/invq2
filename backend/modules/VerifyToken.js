const config = require('../config/config');

function verifyToken(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'];
  
  if (!token) 
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  // verifies secret and checks exp
  if (token === config.token.secret) {
    next();
  } else {
    return res.status(500).send({ auth: false, message: 'Token Unautorized!' });
  }
}

module.exports = verifyToken;