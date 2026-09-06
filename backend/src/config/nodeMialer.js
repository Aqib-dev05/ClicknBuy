import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"ClicknBuy" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    html: `
      <div style="font-family:Arial;padding:10px">
        <h2>Password Reset OTP</h2>
        <p>Your OTP is:</p>
        <h1 style="color:#e63946">${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
      </div>
    `,
  })
}