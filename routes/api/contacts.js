const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const {
  validateBody,
  validateContactStatus,
  isValidId,
} = require('../../middlewares');

const {
  schemas: { addContactsSchema, updateStatusContactSchema },
} = require('../../models/contact');

router.get('/', ctrl.getListContacts);

router.get('/:id', isValidId, ctrl.getContactById);

router.post('/', validateBody(addContactsSchema), ctrl.addContact);

router.put(
  '/:id',
  isValidId,
  validateBody(addContactsSchema),
  ctrl.updateContactById
);

router.patch(
  '/:id/favorite',
  isValidId,
  validateContactStatus,
  validateBody(updateStatusContactSchema),
  ctrl.updateStatusContact
);

router.delete('/:id', isValidId, ctrl.removeContact);

module.exports = router;
