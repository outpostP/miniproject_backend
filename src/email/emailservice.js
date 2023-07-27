const handlebars = require('handlebars');
const fs = require('fs').promises;
const path = require('path');
const transporter = require('../helpers/transporter'); 

const sendVerification = async (email, username, action, verificationToken)  => {
    try {
      const data = await fs.readFile(path.resolve(__dirname,'./registerEmail.html'), 'utf-8');
      const template = handlebars.compile(data);
      let subject = '';
      let buttonText = '';

      switch (action) {
        case 'verification':
            subject = 'Account Verification';
            buttonText = 'Verify Email';
            break;
        case 'change email':
            subject = 'Change Email Verification';
            buttonText = 'Change Email';
            break;
        case 'reset password':
            subject = 'Password Reset';
            buttonText = 'Reset Password';
            break;
        default:
            throw new Error('Invalid action');
    }

      const tempResult = template({
        username,
        action,
        redirect: `https://www.url.us/auth/verify/${verificationToken}`,
        buttonText
      });
  
      await transporter.sendMail({
        to: email,
        subject: 'Account Verification',
        html: tempResult,
      });
      console.log('Verification email sent successfully.');
    } catch (err) {
      console.error('Error sending verification email:', err);
    }
  };
  

  const sendPropertiesChange = async (email, username, propertyName, propertyValue) => {
    try {
      const data = await fs.readFile(path.resolve(__dirname, './changeProp.html'), 'utf-8');
      const template = handlebars.compile(data);
      const tempResult = template({
        username,
        propertyName,
        propertyValue,
      });
  
      await transporter.sendMail({
        to: email,
        subject: `User ${propertyName} Change`,
        html: tempResult,
      });
  
      console.log('User properties change email sent successfully.');
    } catch (err) {
      console.error('Error sending user properties change email:', err);
    }
  };
  
module.exports = {sendVerification, sendPropertiesChange};
