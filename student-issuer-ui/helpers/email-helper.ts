import nodemailer from "nodemailer";

type Payload = {
  to: string;
  subject: string;
  text: string;
};

const smtpSettings = {
  service: "gmail",

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

export const handleEmailFire = async (data: Payload) => {
  const transporter = nodemailer.createTransport({
    ...smtpSettings,
  });

  return await transporter.sendMail({
    from: process.env.SMTP_FROM,
    ...data,
  });
};
