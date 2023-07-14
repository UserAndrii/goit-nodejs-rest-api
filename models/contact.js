const Joi = require('joi');

const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const phoneRegexp = /\(\d{3}\) \d{3}-\d{4}/;

/**
 *  Mongoose Shema
 */

const contactShema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },

    email: {
      type: String,
      unique: true,
      required: [true, 'Set email for contact'],
    },

    phone: {
      type: String,
      match: [
        phoneRegexp,
        'Invalid phone format. The phone number should be in the format: (000) 000-0000.',
      ],
      required: [true, 'Set phone for contact'],
    },

    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactShema.post('save', handleMongooseError);

/**
 *  Joi Shema
 */

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

  phone: Joi.string().min(6).max(20).pattern(phoneRegexp).required().messages({
    'any.required': 'Missing required phone field',
    'string.empty': 'The "phone" field must not be empty',
    'string.min': 'The "phone" field must be at least {#limit} characters long',
    'string.max': 'The "phone" field must not exceed {#limit} characters',
    'string.pattern.base':
      'Invalid phone format. The phone number should be in the format: (000) 000-0000.',
  }),

  favorite: Joi.boolean(),
});

const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': 'Missing required favorite field',
  }),
});

const schemas = {
  addContactsSchema,
  updateStatusContactSchema,
};

const Contact = model('contact', contactShema);

module.exports = { Contact, schemas };
