require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');
const { HttpError, ctrlWrapper } = require('../helpers');

const { SECRET_KEY } = process.env;

// Registration of a new user, password hashing, response: user object with email and subscription.
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw HttpError(409, 'Email in use');

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({ user: { email, subscription: newUser.subscription } });
};

// Authentication of the user, generation of JWT token, response: token, user object with email and subscription.
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, 'Email or password is wrong');

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, 'Email or password is wrong');

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '8h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token, user: { email, subscription: user.subscription } });
};

// Getting the current user, response: object with email and subscription.
const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

// Updating user's subscription, response: object with email and subscription.
const updateUserSubscription = async (req, res) => {
  const { id, subscription } = req.body;

  const result = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true, select: 'email subscription' }
  );

  if (!result) throw HttpError(404, 'Not Found');

  res.json(result);
};

// Log out of the user, token deletion, sending a response to the client with status code 204.
const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.sendStatus(204);
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
  logoutUser: ctrlWrapper(logoutUser),
};
