const Jimp = require('jimp');
const path = require('path');
const fs = require('fs/promises');

const { User } = require('../../models/user');
const { HttpError, ctrlWrapper } = require('../../helpers');

const avatarsDir = path.join(__dirname, '..', '..', 'public', 'avatars');

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

module.exports = ctrlWrapper(updateUserAvatar);
