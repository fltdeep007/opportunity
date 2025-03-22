const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization
  ) {
    try {

      token = req.headers.authorization;


      const decoded = jwt.verify(token, process.env.JWT_SECRET);


      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});


const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (req.user && allowedRoles.includes(req.user.role)) {
      return next();
    } else {
      res.status(403);
      throw new Error(`Not authorized. Required role(s): ${allowedRoles.join(', ')}`);
    }
  };
};

module.exports = { protect, authorizeRoles };
