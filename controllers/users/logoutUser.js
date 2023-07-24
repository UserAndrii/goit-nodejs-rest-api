const { User } = require('../../models/user');
const { ctrlWrapper } = require('../../helpers');

// Log out of the user, token deletion, sending a response to the client with status code 204.
const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.sendStatus(204);
};

module.exports = ctrlWrapper(logoutUser);
