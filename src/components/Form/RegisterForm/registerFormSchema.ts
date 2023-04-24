import { z } from "zod";

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .nonempty("Nome é obrigatório")
      .transform((name) => {
        return name
          .trim()
          .split(" ")
          .map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
          .join("");
      }),
    email: z
      .string()
      .nonempty("O e-mail é obrigatório")
      .email("E-mail inválido"),
    password: z
      .string()
      .min(7, "Mínimo de 7 caracteres")
      .regex(/(?=.*?[A-Z])/, "Necessário ao menos uma letra maiuscula")
      .regex(/(?=.*?[a-z])/, "Necessário ao menos uma letra minúscula ")
      .regex(/(?=.*?[0-9])/, "Necessário conter ao menos um número")
      .regex(/(?=.*?[\W])/, "Necessário conter ao menos um caracter especial"),
    confirmPassword: z.string().nonempty("Por favor, confirme sua senha"),
  })
  .refine(({ password, confirmPassword }) => confirmPassword === password, {
    message: "As senhas não correspondem. Por favor, tente novamente.",
    path: ["confirmPassword"],
  });
