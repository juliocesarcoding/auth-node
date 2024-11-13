import { z } from "zod";

export const authSignUpSchema = z.object({
 name: z.string({ message: "Name obrigatório" }),
 email: z.string({ message: "E-mail obrigatório" }).email("E-mail inválido"),
});
