import { z } from "zod";

export const authUseOtpSchema = z.object({
 id: z.string({ message: "ID obrigatório" }),
 code: z
  .string({ message: "Código obrigatório" })
  .length(6, "Código valido possui 6 números"),
});
