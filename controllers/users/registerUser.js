const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const { User } = require('../../models/user');
const { HttpError, ctrlWrapper, sendEmail } = require('../../helpers');

// Registration of a new user, password hashing,
// response: user object with email and subscription.
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw HttpError(409, 'Email in use');

  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);

  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  await sendEmail(email, verificationToken);

  res.status(201).json({ user: { email, subscription: newUser.subscription } });
};

module.exports = ctrlWrapper(registerUser);
