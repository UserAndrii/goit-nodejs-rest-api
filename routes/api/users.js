const express = require('express');

const ctrl = require('../../controllers/users');

const { validateBody } = require('../../middlewares');

const {
  schemas: { userValidationShema },
} = require('../../models/user');

const router = express.Router();

router.post('/register', validateBody(userValidationShema), ctrl.registerUser);

router.post('/login', validateBody(userValidationShema), ctrl.loginUser);

module.exports = router;
