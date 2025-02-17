import nodemailer from "nodemailer";
import config from "../config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: config.email,
    pass: config.emailPassword,
  },
  connectionTimeout: 15000, // 15 seconds timeout
});

// verification email for verify email address ======================================================

export const generateOTP = (): number => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const sendVerificationOTPEmail = async (to: string, otp: number): Promise<Boolean> => {
  const mailOptions = {
    from: `"one profile" <${config.email}>`,
    to,
    subject: "Email Verification from Bliveprofile",
    html: `<div>
        <h1>Bliveprofile Email Verification</h1>
        <p>Verification code: ${otp}</p>
        <p>verify your email using above one time password</p>
        </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    return false;
  }
};

// -----------------------------------------------------------------------------------------------------------------------
