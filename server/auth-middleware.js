const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

function authMiddleware(req, res, next) {
  const token = req.get('X-Access-Token');
  if (!token) {
    throw new ClientError(401, 'token required');
  } else {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.cartId = payload;
    next();
  }
}

module.exports = authMiddleware;
