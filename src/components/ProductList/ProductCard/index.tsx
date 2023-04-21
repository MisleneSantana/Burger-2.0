import { StyledProductCard } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";
import { CartContext, IProduct } from "../../../providers/CartProvider";
import { useContext } from "react";
import { api } from "../../../services/api";

export interface IProductCard {
  product: IProduct;
}

export const ProductCard = ({ product }: IProductCard) => {
  const { addProductToCart, setIsFiltered, setProductsList, sumProductsInTheCart } =
    useContext(CartContext);

  const handleClickAndLoadProducts = (product: IProduct) => {
    setIsFiltered(false);
    addProductToCart(product.id);

    const loadProducts = async () => {
      try {
        const { data } = await api.get<IProduct[]>("/products");
        setProductsList(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadProducts();
  };

  return (
    <StyledProductCard>
      <div className="imageBox">
        <img src={product.img} alt={product.name} />
      </div>
      <div className="content">
        <StyledTitle tag="h3" $fontSize="three">
          {product.name}
        </StyledTitle>
        <StyledParagraph className="category">
          {product.category}
        </StyledParagraph>
        <StyledParagraph className="price">
          R${" "}
          {Number(product.price).toLocaleString("pt-br", {
            minimumFractionDigits: 2,
          })}
        </StyledParagraph>
        <StyledButton
          $buttonSize="medium"
          $buttonStyle="green"
          onClick={() => {handleClickAndLoadProducts(product), sumProductsInTheCart()}}
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};
