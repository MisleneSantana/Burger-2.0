import { MdSearch } from "react-icons/md";
import { StyledSearchForm } from "./style";
import { StyledButton } from "../../../styles/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext } from "react";
import { CartContext } from "../../../providers/CartProvider";

export interface ISearchFormData {
  search: string | undefined;
}

export const SearchForm = () => {
  const { register, handleSubmit, setValue } = useForm<ISearchFormData>();

  const { setFilteredProducts, showFilteredProducts, setIsFiltered } =
    useContext(CartContext);

  const submitSearchForm: SubmitHandler<ISearchFormData> = (searchFormData) => {
    setFilteredProducts(searchFormData);

    showFilteredProducts(searchFormData);
    setIsFiltered(true);
    setValue("search", "");
  };

  return (
    <StyledSearchForm onSubmit={handleSubmit(submitSearchForm)}>
      <input
        type="text"
        placeholder="Digitar pesquisa"
        {...register("search")}
      />
      <StyledButton type="submit" $buttonSize="medium" $buttonStyle="green">
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};
