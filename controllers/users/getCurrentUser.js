const { ctrlWrapper } = require('../../helpers');

// Getting the current user, response: object with email and subscription.
const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

module.exports = ctrlWrapper(getCurrentUser);
