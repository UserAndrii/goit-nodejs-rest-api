require('dotenv').config();
const Jimp = require('jimp');
const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs/promises');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

const { User } = require('../models/user');
const { HttpError, ctrlWrapper } = require('../helpers');

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, '..', 'public', 'avatars');

// Registration of a new user, password hashing, response: user object with email and subscription.
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw HttpError(409, 'Email in use');

  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

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
  const { _id: id } = req.user;
  const { subscription } = req.body;

  const result = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true, select: '-_id email subscription' }
  );

  if (!result) throw HttpError(404, 'Not Found');

  res.json(result);
};

// Updates the user's avatar, resizes it to 250x250 pixels, and returns the avatar URL in the response.
const updateUserAvatar = async (req, res) => {
  const { _id: id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const avatar = await Jimp.read(tempUpload);
  await avatar.resize(250, 250).writeAsync(tempUpload);
  if (!avatar) throw HttpError(500, 'Failed to process the avatar.');

  const fileName = `${id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, fileName);
  fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join('avatars', fileName);

  await User.findByIdAndUpdate(id, { avatarURL });

  res.json({ avatarURL });
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
  updateUserAvatar: ctrlWrapper(updateUserAvatar),
  logoutUser: ctrlWrapper(logoutUser),
};
