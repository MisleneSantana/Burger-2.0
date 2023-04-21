import {ContadorContainer} from "../../styles/contador";
import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";

export const Contador = () => {
  const { countProducts } = useContext(CartContext);

  return <ContadorContainer>{countProducts}</ContadorContainer>;
};


