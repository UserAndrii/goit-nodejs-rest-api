const { Contact } = require('../models/contact');

const { HttpError, ctrlWrapper } = require('../helpers');

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

// Get a contact by its ID
const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);

  if (!result) throw HttpError(404, 'Not Found');

  res.json(result);
};

// Add a new contact
const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json(result);
};

// Update a contact by its ID
const updateContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) throw HttpError(404, 'Not Found');

  res.json(result);
};

// Update a favorite field by its ID
const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) throw HttpError(404, 'Not Found');

  res.json(result);
};

// Delete a contact by its ID
const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);

  if (!result) throw HttpError(404, 'Not Found');

  res.json({ message: 'Contact deleted' });
};

module.exports = {
  getListContacts: ctrlWrapper(getListContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  removeContact: ctrlWrapper(removeContact),
};
