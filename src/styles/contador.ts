import styled from "styled-components";

export const ContadorContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.4375rem;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 0.4375rem;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
  font-size: 11px;
`;
