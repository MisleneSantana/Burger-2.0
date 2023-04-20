import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import { ProductCard } from "./ProductCard";
import { StyledProductList } from "./style";

const ProductList = () => {
  const { productsList } = useContext(CartContext);
  return (
    <StyledProductList>
      {productsList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
