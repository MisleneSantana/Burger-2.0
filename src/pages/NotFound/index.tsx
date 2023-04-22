import { StyledContainerNotFound } from "../../styles/loading";
import error from "../../assets/404Error.png";

export const NotFound = () => {
  return (
    <StyledContainerNotFound>
      <h1>Ops, página não encontrada</h1>
      <img src={error} alt="error"></img>
    </StyledContainerNotFound>
  );
};
