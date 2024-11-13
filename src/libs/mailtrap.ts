import { MailtrapClient } from "mailtrap";

export const sendEmail = async (to: string, subject: string, body: string) => {
 const mailtrap = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN as string,
  testInboxId: 3276339,
 });
 try {
  //use testing just for test. remove it when prod
  await mailtrap.testing.send({
   from: { name: "Sistema", email: "sistema@email.com" },
   to: [{ email: to }],
   subject,
   text: body,
  });
  return true;
 } catch (error) {
  return false;
 }
};
