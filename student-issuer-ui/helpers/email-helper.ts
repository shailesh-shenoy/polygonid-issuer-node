import { IssuerEmail } from "@/components/IssuerEmail";
import { IssueDetails, IssueRequest } from "@/types";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";

const smtpSettings = {
  service: "gmail",

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};
const expirationTimeInMinutes =
  Number(process.env.ISSUER_CLAIM_EXPIRY_MIN) || 60;

export const handleEmailFire = async (issueRequest: IssueRequest) => {
  const transporter = nodemailer.createTransport({
    ...smtpSettings,
  });

  const issueDetails: IssueDetails = {
    studentEmail: issueRequest.studentEmail,
    address: issueRequest.address,
    addressLast15: issueRequest.addressLast15,
    qrCodeLink:
      "iden3comm://?request_uri=http://35.245.157.181:3002/v1/qr-store?id=2de47333-17ec-4727-b740-2669cd78b9ad",
    expirationDate: new Date(
      new Date().getTime() + expirationTimeInMinutes * 60000
    ),
  };

  return await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: issueRequest.studentEmail,
    subject: "Claim your Student Verified Credential",
    html: render(IssuerEmail(issueDetails)),
  });
};
