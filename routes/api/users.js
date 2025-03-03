const express = require('express');

const ctrl = require('../../controllers/users');

const {
  upload,
  authenticate,
  validateBody,
  validateEmailVerification,
} = require('../../middlewares');

const {
  schemas: {
    userValidationShema,
    subscriptionRenewalSchema,
    verificationEmailSchema,
  },
} = require('../../models/user');

const router = express.Router();

router.post('/register', validateBody(userValidationShema), ctrl.registerUser);

router.get('/verify/:verificationToken', ctrl.verifyUserEmail);

router.post(
  '/verify',
  validateEmailVerification(verificationEmailSchema),
  ctrl.resendVerifyUserEmail
);

router.post('/login', validateBody(userValidationShema), ctrl.loginUser);

router.get('/current', authenticate, ctrl.getCurrentUser);

router.post('/logout', authenticate, ctrl.logoutUser);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrl.updateUserAvatar
);

router.patch(
  '/',
  authenticate,
  validateBody(subscriptionRenewalSchema),
  ctrl.updateUserSubscription
);

module.exports = router;
