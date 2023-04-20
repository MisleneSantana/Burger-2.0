import { z } from "zod";

export const registerFormSchema = z
  .object({
    name: z.string().nonempty("O nome é obrigatório"),
    email: z
      .string()
      .nonempty("O e-mail é obrigatório")
      .email("Por favor, forneça um e-mail válido"),
    password: z
      .string()
      .min(7, "A senha precisa conter o mínimo de 7 caracteres")
      .regex(/(?=.*?[A-Z])/, "Necessário ao menos uma letra maiuscula")
      .regex(/(?=.*?[a-z])/, "Necessário ao menos uma letra minúscula ")
      .regex(/(?=.*?[0-9])/, "Necessário conter ao menos um número")
      .regex(/(?=.*?[\W])/, "Necessário conter ao menos um caracter especial"),
    confirmPassword: z.string().nonempty("Por favor, confirme sua senha"),
  })
  .refine(({ password, confirmPassword }) => confirmPassword === password, {
    message:
      "As senhas não correspondem. Por favor, tente novamente.",
    path: ["confirmPassword"],
  });
