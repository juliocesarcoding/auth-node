import { z } from "zod";

export const authSignInSchema = z.object({
 email: z.string({ message: "E-mail obrigatório" }).email("E-mail inválido"),
});
