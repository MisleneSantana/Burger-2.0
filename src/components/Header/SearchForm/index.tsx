import { MdSearch } from "react-icons/md";
import { StyledSearchForm } from "./style";
import { StyledButton } from "../../../styles/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { CartContext } from "../../../providers/CartProvider";

export interface ISearchFormData {
  search: string;
}

export const SearchForm = () => {
  const { register, handleSubmit } = useForm<ISearchFormData>();

  const {
    showFilteredProducts,
    filteredProducts,
    setFilteredProducts,
    clearInput,
    setClearInput,
    setIsFiltered,
  } = useContext(CartContext);

  const submitSearchForm: SubmitHandler<ISearchFormData> = (searchFormData) => {
    setFilteredProducts(searchFormData);

    showFilteredProducts(searchFormData);
    setIsFiltered(true);

    setClearInput(filteredProducts);
    // setClearInput({ search: "" });
    setFilteredProducts({ search: "" });
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

// showProducts(filteredProducts);
// setIsFiltered(true);
// setFilteredProductsResult(filteredProducts);
// setFilteredProducts("");
