require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, message) => {
  try {
    // Create a transporter (connection to the email server)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // false for TLS (587), true for SSL (465)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
 
    // Define the email content
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: to,
      subject: subject,
      text: message,
    };
 
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    return;
  } catch (error) {
    console.error('Error sending email:', error);
    return;
  }
};

module.exports = { nodemailer, sendEmail };