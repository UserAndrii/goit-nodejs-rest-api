const { HttpError } = require('../helpers');

// Validates the presence of the "email" field in the request object
const validateEmailVerification = shema => {
  const func = async (req, _, next) => {
    const { error } = shema.validate(req.body);

    if (Object.keys(req.body).length === 0) next(HttpError(400, error.message));

    next();
  };
  return func;
};

module.exports = validateEmailVerification;
