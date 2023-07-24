const registerUser = require('./registerUser');
const verifyUserEmail = require('./verifyUserEmail');
const resendVerifyUserEmail = require('./resendVerifyUserEmail');
const loginUser = require('./loginUser');
const getCurrentUser = require('./getCurrentUser');
const updateUserSubscription = require('./updateUserSubscription');
const updateUserAvatar = require('./updateUserAvatar');
const logoutUser = require('./logoutUser');

module.exports = {
  registerUser,
  verifyUserEmail,
  resendVerifyUserEmail,
  loginUser,
  getCurrentUser,
  updateUserSubscription,
  updateUserAvatar,
  logoutUser,
};
