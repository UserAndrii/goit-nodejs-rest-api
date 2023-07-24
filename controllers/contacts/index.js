const getListContacts = require('./getListContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const updateContactById = require('./updateContactById');
const updateStatusContact = require('./updateStatusContact');
const removeContact = require('./removeContact');

module.exports = {
  getListContacts,
  getContactById,
  addContact,
  updateContactById,
  updateStatusContact,
  removeContact,
};
