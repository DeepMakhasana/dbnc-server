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
    from: `"Liveyst" <${config.email}>`,
    to,
    subject: "Email Verification from Liveyst",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Verification Code</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 500px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); text-align: center; }
          .logo { max-width: 150px; margin-bottom: 20px; }
          .header { font-size: 20px; font-weight: bold; color: #333; }
          .code { font-size: 24px; font-weight: bold; color: #007bff; background: #f3f3f3; display: inline-block; padding: 10px 20px; border-radius: 5px; margin: 10px 0; }
          .footer { font-size: 12px; color: #777; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://dbnc.s3.ap-south-1.amazonaws.com/opengraph-image.png" alt="Liveyst" class="logo">
          <p class="header">Your Verification Code</p>
          <p>Please use the following code to verify your email address:</p>
          <p class="code">${otp}</p>
          <p>If you didn’t request this, please ignore this email.</p>
          <div class="footer">
            <p>© 2025 Liveyst. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
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
