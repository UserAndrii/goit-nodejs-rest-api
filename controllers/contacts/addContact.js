const { Contact } = require('../../models/contact');

const { ctrlWrapper } = require('../../helpers');

// Add a new contact
const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json(result);
};

module.exports = ctrlWrapper(addContact);
