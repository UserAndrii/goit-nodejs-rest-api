const { User } = require('../../models/user');
const { HttpError, ctrlWrapper } = require('../../helpers');

// Define the function to update user subscription.
// If the update was successful, send the updated user's data in the response
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

module.exports = ctrlWrapper(updateUserSubscription);
