require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../../models/user');
const { HttpError, ctrlWrapper } = require('../../helpers');

const { SECRET_KEY } = process.env;

// Authentication of the user, generation of JWT token, response: token, user object with email and subscription.
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, 'Email or password is wrong');

  if (!user.verify)
    throw HttpError(401, 'Email not verified. Confirm your email, please');

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, 'Email or password is wrong');

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '8h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token, user: { email, subscription: user.subscription } });
};

module.exports = ctrlWrapper(loginUser);
