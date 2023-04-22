import { StyledLoading } from "../../styles/loading";
import loading from "../../assets/loading.png";

export const Loading = () => {
  return (
    <StyledLoading className="loading">
      <h1>A página está carregando</h1>
      <img src={loading} alt="icon-loading"></img>
    </StyledLoading>
  );
};
