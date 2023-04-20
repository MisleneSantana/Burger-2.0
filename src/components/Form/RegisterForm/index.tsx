import { Input } from "../Input";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "./registerFormSchema";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserProvider";

export interface IRegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const { postRegisterUser } = useContext(UserContext);

  const registerFormSubmit: SubmitHandler<IRegisterFormData> = (
    registerFormData
  ) => {
    postRegisterUser(registerFormData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(registerFormSubmit)}>
      <Input
        type="text"
        label="Nome"
        placeholder="Nome"
        id="name"
        {...register("name")}
        error={errors.name}
      />
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
      <Input
        type="password"
        label="Confirmar senha"
        placeholder="Confirmar senha"
        id="confirmPassword"
        {...register("confirmPassword")}
        error={errors.confirmPassword}
      />
      <StyledButton $buttonSize="default" $buttonStyle="gray" type="submit">
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
