import { MdShoppingCart, MdLogout } from "react-icons/md";

import { SearchForm } from "./SearchForm";
import { StyledHeader } from "./style";
import LogoKenzieBurguer from "../../assets/LogoKenzieBurguer.svg";

import { StyledContainer } from "../../styles/grid";
import { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { CartContext } from "../../providers/CartProvider";
import { Contador } from "../Contador";

const Header = () => {
  const { userLogout } = useContext(UserContext);
  const { setIsCartModalOpen, cartProducts } = useContext(CartContext);

  return (
    <StyledHeader>
      <StyledContainer containerWidth={1300}>
        <div className="flexGrid">
          <img
            src={LogoKenzieBurguer}
            alt="Kenzie Burguer Logo"
            className="logo"
          />
          <nav className="nav" role="navigation">
            <SearchForm />
            <div className="buttons">
              <button
                type="button"
                onClick={() => {
                  setIsCartModalOpen(true);
                }}
              >
                {cartProducts.length > 0 ? <Contador /> : null}
                <MdShoppingCart size={28} />
              </button>
              <button type="button" onClick={() => userLogout()}>
                <MdLogout size={28} />
              </button>
            </div>
          </nav>
        </div>
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;
