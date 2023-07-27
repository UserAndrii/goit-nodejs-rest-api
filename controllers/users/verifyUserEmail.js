const { User } = require('../../models/user');
const { HttpError, ctrlWrapper } = require('../../helpers');

// Define the function to verify user's email.
// If verification is successful, send a success response
const verifyUserEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) throw HttpError(404, 'User not found');

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({ message: 'Verification successful' });
};

module.exports = ctrlWrapper(verifyUserEmail);
