const validateBody = require('./validateBody');
const isValidId = require('./isValidId');
const validateContactStatus = require('./validateContactStatus');
const authenticate = require('./authenticate');
const upload = require('./upload');

module.exports = {
  validateBody,
  isValidId,
  validateContactStatus,
  authenticate,
  upload,
};
