import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { getUserById } from "../services/user";

export const privateFunction = async (req: ExtendedRequest, res: Response) => {
 if (!req.userId) {
  res.status(403).json({ error: "Unauthorized" });
  return;
 }
 const user = await getUserById(req.userId as number);
 if (!user) {
  res.status(403).json({ error: "Unauthorized" });
  return;
 }
 res.json({ user });
};
