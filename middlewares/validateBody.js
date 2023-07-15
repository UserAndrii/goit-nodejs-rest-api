const { HttpError } = require('../helpers');

// Checking the body of the request according to the given scheme
const validateBody = shema => {
  const func = async (req, _, next) => {
    const { error } = shema.validate(req.body);

    if (Object.keys(req.body).length === 0)
      next(HttpError(400, 'Missing fields'));

    if (Object.keys(req.body).length < 3 && error)
      next(HttpError(400, error.message));

    if (error) next(HttpError(404, error.message));

    next();
  };
  return func;
};

module.exports = validateBody;
