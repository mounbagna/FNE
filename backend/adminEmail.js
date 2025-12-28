const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = async (userEmail, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.SECURE === "true",
      auth: {
        user: process.env.USER,  // your Gmail account
        pass: process.env.PASS,
      },
      family: 4,
    });

    await transporter.sendMail({   // ✅ use sendMail, not adminEmail
      from: `"Contact Form" <${process.env.USER}>`,  // must match Gmail account
      to: process.env.ADMIN_EMAIL,                  // must be a valid recipient
      subject: subject || "Contact Form Message",
      text: `Sender: ${userEmail}\n${message}`,
    });

    console.log("Email sent successfully to admin!");
    return true;
  } catch (error) {
    console.error("Email not sent!");
    console.error(error);
    return false;
  }
};
