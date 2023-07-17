const Joi = require('joi');

const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 *  Mongoose Shema
 */

const userShema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
      minlenght: [6, 'The password field must be at least 6 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [emailRegexp, 'Invalid email format'],
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userShema.post('save', handleMongooseError);

/**
 *  Joi Shema for user validation
 */

const userValidationShema = Joi.object({
  password: Joi.string().min(6).required().messages({
    'any.required': 'Missing required password field',
    'string.empty': 'The "password" field must not be empty',
    'string.min':
      'The "password" field must be at least {#limit} characters long',
  }),

  email: Joi.string().required().pattern(emailRegexp).messages({
    'any.required': 'Missing required email field',
    'string.empty': 'The "email" field must not be empty',
    'string.pattern.base': 'Invalid email format',
  }),
});

const schemas = {
  userValidationShema,
};

const User = model('user', userShema);

module.exports = { User, schemas };
