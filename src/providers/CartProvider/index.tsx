import { createContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { ISearchFormData } from "../../components/Header/SearchForm";
import { any } from "zod";

export interface ICartProviderProps {
  children: React.ReactNode;
}

export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

export interface IProductsContext {
  productsList: IProduct[];
  setProductsList: React.Dispatch<React.SetStateAction<IProduct[]>>;
  isCartModalOpen: boolean;
  setIsCartModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartProducts: IProduct[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<ISearchFormData>>;
  isFiltered: boolean;
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
  countProducts: number;
  setCountProducts: React.Dispatch<React.SetStateAction<number>>;
  showFilteredProducts: (searchFormData: ISearchFormData) => void;
  addProductToCart: (productId: number) => void;
  removeProductFromCart: (productId: number) => void;
  removeAll: () => void;
  sumProductsInTheCart: () => void;
  subProductsInTheCart: () => void;
}

export const CartContext = createContext({} as IProductsContext);

export const CartProvider = ({ children }: ICartProviderProps) => {
  const [productsList, setProductsList] = useState<IProduct[]>([]);
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<ISearchFormData>(); //Guardando data do formSearch para renderização futura.
  const [isFiltered, setIsFiltered] = useState(false);
  const [countProducts, setCountProducts] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await api.get<IProduct[]>("/products");
        setProductsList(data);
        setIsFiltered(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadProducts();
  }, []);

  // *Filter/Search*:
  const showFilteredProducts = (searchFormData: ISearchFormData) => {
    const filterProduct = productsList.filter((product) => {
      return filteredProducts?.search === ""
        ? true
        : product.name
            .toUpperCase()
            .includes(searchFormData.search.toUpperCase()) ||
            product.category
              .toUpperCase()
              .includes(searchFormData.search.toUpperCase());
    });
    setProductsList(filterProduct);
  };

  // *Add to cart*:
  const addProductToCart = (productId: number) => {
    if (cartProducts.some((product) => product.id === productId)) {
      toast.error("O item já foi adicionado ao carrinho", {
        autoClose: 2000,
      });
    } else {
      const productAdd: any = productsList.find(
        (product) => product.id === productId
      );
      setCartProducts([...cartProducts, productAdd]);
    }
  };

  // *Remove from cart*:
  const removeProductFromCart = (productId: number) => {
    const newCartList = cartProducts.filter(
      (product) => product.id !== productId
    );
    setCartProducts(newCartList);
  };

  const removeAll = () => {
    setCartProducts([]);
  };

  // *Count Products*:
  const sumProductsInTheCart = () => {
    return setCountProducts(countProducts + 1);
  };

  const subProductsInTheCart = () => {
    return setCountProducts(countProducts - 1);
  };

  return (
    <CartContext.Provider
      value={{
        productsList,
        setProductsList,
        isCartModalOpen,
        setIsCartModalOpen,
        cartProducts,
        setFilteredProducts,
        isFiltered,
        setIsFiltered,
        countProducts,
        setCountProducts,
        showFilteredProducts,
        addProductToCart,
        removeProductFromCart,
        removeAll,
        sumProductsInTheCart,
        subProductsInTheCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
