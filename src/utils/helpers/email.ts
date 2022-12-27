import nodemailer from "nodemailer";
import config from "../../config";

let transporter: any;
export const sendEmail = async (
  email: string,
  subject: string,
  message: string
) => {
  // 1. create a transporter
  transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: Number(config.SMTP_PORT),
    requireTLS: true,
    auth: {
      user: config.SMTP_USERNAME,
      pass: config.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: config.SMTP_EMAIL,
    to: email,
    subject,
    html: message,
  };
  transporter.sendMail(mailOptions, (error: any) => {
    console.log(mailOptions);
    if (error) {
      console.log(error.message, ">>>>");
    } else {
      console.log("Message Sent>>>");
    }
  });
};
