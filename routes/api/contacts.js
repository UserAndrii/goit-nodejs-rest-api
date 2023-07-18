const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const {
  validateBody,
  validateContactStatus,
  isValidId,
  authenticate,
} = require('../../middlewares');

const {
  schemas: { addContactsSchema, updateStatusContactSchema },
} = require('../../models/contact');

router.get('/', authenticate, ctrl.getListContacts);

router.get('/:id', authenticate, isValidId, ctrl.getContactById);

router.post(
  '/',
  authenticate,
  validateBody(addContactsSchema),
  ctrl.addContact
);

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(addContactsSchema),
  ctrl.updateContactById
);

router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateContactStatus,
  validateBody(updateStatusContactSchema),
  ctrl.updateStatusContact
);

router.delete('/:id', authenticate, isValidId, ctrl.removeContact);

module.exports = router;
