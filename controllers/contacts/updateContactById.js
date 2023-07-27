const { Contact } = require('../../models/contact');

const { HttpError, ctrlWrapper } = require('../../helpers');

// Update a contact by its ID
const updateContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) throw HttpError(404, 'Not Found');

  res.json(result);
};

module.exports = ctrlWrapper(updateContactById);
