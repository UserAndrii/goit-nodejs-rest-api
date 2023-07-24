const { Contact } = require('../../models/contact');

const { HttpError, ctrlWrapper } = require('../../helpers');

// Delete a contact by its ID
const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);

  if (!result) throw HttpError(404, 'Not Found');

  res.json({ message: 'Contact deleted' });
};

module.exports = ctrlWrapper(removeContact);
