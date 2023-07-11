const fs = require('fs/promises');
const path = require('path');

const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const getListContacts = async () => {
  const data = await fs.readFile(contactsPath);

  // Returns an array of contacts.
  return JSON.parse(data);
};

const getContactById = async id => {
  const contacts = await getListContacts();

  // Returns the contact object with the specified id. Returns null if no contact with this id is found.
  return contacts.find(contact => contact.id === id) || null;
};

const addContact = async data => {
  const contacts = await getListContacts();

  const newContact = {
    id: nanoid(),
    ...data,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  // Returns the added contact object.
  return newContact;
};

const updateContactById = async (id, data) => {
  const contacts = await getListContacts();
  const index = contacts.findIndex(contact => contact.id === id);

  if (index === -1) {
    return null;
  }

  contacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  // Returns the updated contact object.
  return contacts[index];
};

const removeContact = async id => {
  const contacts = await getListContacts();
  const index = contacts.findIndex(contact => contact.id === id);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  // Returns the object of the deleted contact. Returns null if no contact with this id is found.
  return result;
};

module.exports = {
  getListContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact,
};
