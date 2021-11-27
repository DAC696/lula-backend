// importing required credentials
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

let resetTemplate = require('./resetPasswordTemplate');

let newEmployeeTemplate = require('./newEmployeeAddedTemplate');

const sgMail = require('@sendgrid/mail');

const { CLIENT_EMAIL } = require('../../utils/constants');

const sendEmail = async (userEmail, password, templateName) => {

  try {
    // initializing SendGrid SDK with API KEY

    sgMail.setApiKey(SENDGRID_API_KEY);

    const msg = {
      to: userEmail,
      from: CLIENT_EMAIL,
      subject: 'Your Password has been set',
      text: 'Password has been set',
      html: templateName.trim() === "resetPassword" ? resetTemplate(password) : newEmployeeTemplate(password)

    };

    let emailSent = await sgMail.send(msg);

    if (!emailSent) {
      console.log('err in sending mail');
      console.log(err);
    } else {
      console.log(' sending mail');
      emailSent = true;
    }

    console.log('email senttttttttt ', emailSent);

    return emailSent;
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
