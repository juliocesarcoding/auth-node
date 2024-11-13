import { v4 as uuid } from "uuid";
import { prisma } from "../libs/prisma";

export const generateOTP = async (userId: number) => {
 const code = Math.floor(100000 + Math.random() * 900000).toString();
 const expired = new Date();
 expired.setMinutes(expired.getMinutes() + 30);

 const otp = await prisma.otp.create({
  data: {
   id: uuid(),
   code,
   userId,
   expiresAt: expired,
  },
 });

 return otp;
};
export const validateOTP = async (id: string, code: string) => {
 const otp = await prisma.otp.findFirst({
  select: { user: true },
  where: { id, code, expiresAt: { gt: new Date() }, used: false },
 });
 if (otp && otp.user) {
  await prisma.otp.update({ where: { id }, data: { used: true } });
  return otp.user;
 }
 return false;
};
