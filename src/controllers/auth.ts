import { RequestHandler } from "express";
import { authSignInSchema } from "../schemas/auth-sigin";
import { createUser, getUserByEmail } from "../services/user";
import { generateOTP, validateOTP } from "../services/otp";
import { sendEmail } from "../libs/mailtrap";
import { authSignUpSchema } from "../schemas/auth-signup";
import { authUseOtpSchema } from "../schemas/auth-useotp";
import { createJWT } from "../libs/jwt";

export const signin: RequestHandler = async (req, res) => {
 //Validate data received
 const data = authSignInSchema.safeParse(req.body);
 if (data.success === false) {
  res.json({ error: data.error.flatten().fieldErrors });
  return;
 }
 //Validate if user exists (based on e-mail)
 const user = await getUserByEmail(data.data.email);
 if (!user) {
  res.json({ error: "User not found" });
  return;
 }
 // Generate OTP and send it to user
 const otp = await generateOTP(user.id);
 // Send OTP to user
 await sendEmail(
  user.email,
  "Código de verificação",
  `O código de verificação é: ${otp.code}`
 );
 // Returns ID of OTP
 res.json({ otpid: otp.id });
};

export const signup: RequestHandler = async (req, res) => {
 //Validate received data
 const data = authSignUpSchema.safeParse(req.body);
 if (data.success === false) {
  res.json({ error: data.error.flatten().fieldErrors });
  return;
 }
 //Validate if user and email exists
 const user = await getUserByEmail(data.data.email);
 if (user) {
  res.json({ error: "User already exists with this email" });
  return;
 }
 //Create user
 const newUser = await createUser(data.data.name, data.data.email);
 //Retorn created data user
 res.status(201).json({ newUser });
};

export const useOTP: RequestHandler = async (req, res) => {
 //Validate received data
 const data = authUseOtpSchema.safeParse(req.body);
 if (data.success === false) {
  res.json({ error: data.error.flatten().fieldErrors });
  return;
 }
 //Validate OTP and if it is valid
 const user = await validateOTP(data.data.id, data.data.code);
 if (!user) {
  res.json({ error: "Invalid OTP or expired" });
  return;
 }
 //Create JWT token
 const token = createJWT(user.id);
 //Return token
 res.json({ token, user });
};
