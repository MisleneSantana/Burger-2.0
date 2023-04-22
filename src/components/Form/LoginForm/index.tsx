import { StyledForm } from "../../../styles/form";
import { Input } from "../Input";
import { StyledButton } from "../../../styles/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "./loginFormSchema";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserProvider";

export interface ILoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const { login, loading } = useContext(UserContext);

  const loginFormSubmit: SubmitHandler<ILoginFormData> = (loginFormData) => {
    login(loginFormData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(loginFormSubmit)}>
      <Input
        type="email"
        label="Email"
        placeholder="Email"
        id="email"
        {...register("email")}
        error={errors.email}
      />
      <Input
        type="password"
        label="Senha"
        placeholder="Senha"
        id="password"
        {...register("password")}
        error={errors.password}
      />
      <StyledButton
        $buttonSize="default"
        $buttonStyle="green"
        type="submit"
        disabled={loading}
      >
        {loading ? "Entrando" : "Entrar"}
      </StyledButton>
    </StyledForm>
  );
};

