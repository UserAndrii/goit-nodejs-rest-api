const contacts = require('../models/contacts');

const { HttpError, ctrlWrapper } = require('../helpers');

// Get a list of contacts
const getListContacts = async (_, res) => {
  const result = await contacts.getListContacts();

  res.json(result);
};

// Get a contact by its ID
const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);

  if (!result) throw HttpError(404, 'Not Found');

  res.json(result);
};

// Add a new contact
const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);

  res.status(201).json(result);
};

// Update a contact by its ID
const updateContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.updateContactById(id, req.body);

  if (!result) throw HttpError(404, 'Not Found');

  res.json(result);
};

// Delete a contact by its ID
const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);

  if (!result) throw HttpError(404, 'Not Found');

  res.json({
    message: 'Contact deleted',
  });
};

module.exports = {
  getListContacts: ctrlWrapper(getListContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  removeContact: ctrlWrapper(removeContact),
};
