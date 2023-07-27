require('dotenv').config();
const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY, BASE_URL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (email, verificationToken) => {
  const verifyEmail = {
    to: email,
    from: 'userandrii@meta.ua',
    subject: 'Verify email',
    html: `
    <p>Dear User,</p>
    <p>Thank you for registering on our website. To complete the registration process, please verify your email by clicking the link below:</p>
    <p><a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Verify Email</a></p>
    <p>If you didn't sign up on our website, please ignore this email.</p>
    <p>Best regards,<br>Our Website Team</p>
  `,
  };

  await sgMail.send(verifyEmail);
  return true;
};

module.exports = sendEmail;
