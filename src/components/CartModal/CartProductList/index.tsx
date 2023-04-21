import { StyledCartProductList } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph } from "../../../styles/typography";
import { CartProductCard } from "./CartProductCard";
import { useContext } from "react";
import { CartContext } from "../../../providers/CartProvider";

export const CartProductList = () => {
  const { cartProducts, setIsCartModalOpen, removeAll } =
    useContext(CartContext);

  if (cartProducts.length > 0) {
    const total = cartProducts
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue.price;
      }, 0)
      .toLocaleString("pt-br", { minimumFractionDigits: 2 });

    return (
      <StyledCartProductList>
        <ul>
          {cartProducts.map((product) => (
            <CartProductCard key={product.id} product={product} />
          ))}
        </ul>

        <div className="totalBox">
          <StyledParagraph>
            <strong>Total</strong>
          </StyledParagraph>
          <StyledParagraph className="total">R$ {total}</StyledParagraph>
        </div>
        <StyledButton
          $buttonSize="default"
          $buttonStyle="gray"
          onClick={() => {
            removeAll(), setIsCartModalOpen(false);
          }}
        >
          Remover todos
        </StyledButton>
      </StyledCartProductList>
    );
  }
};
