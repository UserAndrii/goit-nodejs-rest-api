const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares');

const { addContactsSchema } = require('../../shemas/contacts');

router.get('/', ctrl.getListContacts);

router.get('/:id', ctrl.getContactById);

router.post('/', validateBody(addContactsSchema), ctrl.addContact);

router.put('/:id', validateBody(addContactsSchema), ctrl.updateContactById);

router.delete('/:id', ctrl.removeContact);

module.exports = router;
