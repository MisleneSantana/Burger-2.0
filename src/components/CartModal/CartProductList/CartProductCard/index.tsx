import { MdDelete } from "react-icons/md";

import { StyledCartProductCard } from "./style";
import { StyledTitle } from "../../../../styles/typography";
import { CartContext, IProduct } from "../../../../providers/CartProvider";
import { useContext } from "react";

interface IProductCart {
  product: IProduct;
}

export const CartProductCard = ({ product }: IProductCart) => {
  const { removeProductFromCart, subProductsInTheCart } =
    useContext(CartContext);
  return (
    <StyledCartProductCard>
      <div className="imageBox">
        <img src={product.img} alt={product.name} />
      </div>
      <div className="contentBox">
        <StyledTitle tag="h3" $fontSize="three">
          {product.name}
        </StyledTitle>
        <button
          type="button"
          aria-label="Remover"
          onClick={() => {
            removeProductFromCart(product.id), subProductsInTheCart();
          }}
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};
