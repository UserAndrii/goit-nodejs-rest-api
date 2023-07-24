const validateBody = require('./validateBody');
const isValidId = require('./isValidId');
const validateContactStatus = require('./validateContactStatus');
const validateEmailVerification = require('./validateEmailVerification');
const authenticate = require('./authenticate');
const upload = require('./upload');

module.exports = {
  isValidId,
  validateBody,
  validateContactStatus,
  validateEmailVerification,
  authenticate,
  upload,
};
