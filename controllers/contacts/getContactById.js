const { Contact } = require('../../models/contact');

const { HttpError, ctrlWrapper } = require('../../helpers');

// Get a contact by its ID
const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);

  if (!result) throw HttpError(404, 'Not Found');

  res.json(result);
};

module.exports = ctrlWrapper(getContactById);
