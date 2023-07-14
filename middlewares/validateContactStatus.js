const { HttpError } = require('../helpers');

// Validates the presence of the "favorite" field in the request object
const validateContactStatus = (req, _, next) => {
  if (Object.keys(req.body).length === 0)
    next(HttpError(400, 'Missing field favorite'));

  next();
};

module.exports = validateContactStatus;
