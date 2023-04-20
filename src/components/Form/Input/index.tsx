import { FieldError } from "react-hook-form";
import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import { StyledInputContainer } from "../../../styles/form";
import { StyledParagraph } from "../../../styles/typography";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
}

export const Input = forwardRef(
  (
    { label, id, error, ...rest }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div>
        <StyledInputContainer>
          <input ref={ref} id={id} {...rest} />
          {label ? <label htmlFor={id}>{label}</label> : null}
        </StyledInputContainer>
        {error ? (
          <StyledParagraph fontColor="red">{error.message}</StyledParagraph>
        ) : null}
      </div>
    );
  }
);
