import { StyledShopPage } from "./style";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import ProductList from "../../components/ProductList";
import { StyledContainer } from "../../styles/grid";
import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";

export const ShopPage = () => {
  const { isCartModalOpen } = useContext(CartContext);

  return (
    <StyledShopPage>
      {isCartModalOpen ? <CartModal /> : null}
      <Header />
      <main>
        <StyledContainer containerWidth={1300}>
          <ProductList />
        </StyledContainer>
      </main>
    </StyledShopPage>
  );
};
