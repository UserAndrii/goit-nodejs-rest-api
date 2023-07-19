const express = require('express');

const ctrl = require('../../controllers/users');

const { validateBody, authenticate } = require('../../middlewares');

const {
  schemas: { userValidationShema, subscriptionRenewalSchema },
} = require('../../models/user');

const router = express.Router();

router.post('/register', validateBody(userValidationShema), ctrl.registerUser);

router.post('/login', validateBody(userValidationShema), ctrl.loginUser);

router.get('/current', authenticate, ctrl.getCurrentUser);

router.post('/logout', authenticate, ctrl.logoutUser);

router.patch(
  '/',
  authenticate,
  validateBody(subscriptionRenewalSchema),
  ctrl.updateUserSubscription
);

module.exports = router;
