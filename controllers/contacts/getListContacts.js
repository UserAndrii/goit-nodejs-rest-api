const { Contact } = require('../../models/contact');

const { ctrlWrapper } = require('../../helpers');

// Get a list of contacts
const getListContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;

  const skip = (page - 1) * limit;

  const result = await Contact.find(
    { owner, favorite: favorite ?? [true, false] },
    '-createdAt -updatedAt',
    { skip, limit }
  ).populate('owner', '_id email subscription');

  res.json(result);
};

module.exports = ctrlWrapper(getListContacts);
