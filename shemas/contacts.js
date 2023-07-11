const Joi = require('joi');

const addContactsSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Missing required name field',
    'string.empty': 'The "name" field must not be empty',
  }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required()
    .messages({
      'any.required': 'Missing required email field',
      'string.empty': 'The "email" field must not be empty',
      'string.email': 'Please enter a valid email address',
      'string.minDomainSegments':
        'The email address must have at least two domain segments',
      'string.tlds.allowOnly':
        'Only domain extensions ".com" and ".net" are allowed',
    }),

  phone: Joi.string().min(6).max(20).required().messages({
    'any.required': 'Missing required phone field',
    'string.empty': 'The "phone" field must not be empty',
    'string.min': 'The "phone" field must be at least {#limit} characters long',
    'string.max': 'The "phone" field must not exceed {#limit} characters',
  }),
});

module.exports = { addContactsSchema };
