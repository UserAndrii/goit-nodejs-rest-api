const { User } = require('../../models/user');
const { HttpError, ctrlWrapper, sendEmail } = require('../../helpers');

// Define the function to resend verification email.
// If email sent successfully, send a success response
const resendVerifyUserEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw HttpError(404, 'User not found');

  if (user.verify) throw HttpError(400, 'Verification has already been passed');

  await sendEmail(email, user.verificationToken);

  res.json({ message: 'Verification email sent' });
};

module.exports = ctrlWrapper(resendVerifyUserEmail);
