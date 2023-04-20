import { createContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { ISearchFormData } from "../../components/Header/SearchForm";

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
  filteredProducts: ISearchFormData;
  setFilteredProducts: React.Dispatch<React.SetStateAction<ISearchFormData | undefined>>;
  clearInput: {};
  setClearInput: React.Dispatch<React.SetStateAction<{}>>;
  isFiltered: boolean;
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
  showFilteredProducts: (searchFormData: ISearchFormData) => void;
  addProductToCart: (productId: number) => void;
  removeProductFromCart: (productId: number) => void;
  removeAll: () => void;
}

export const CartContext = createContext({} as IProductsContext);

export const CartProvider = ({ children }: ICartProviderProps) => {
  const [productsList, setProductsList] = useState<IProduct[]>([]);
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<ISearchFormData>();
  const [clearInput, setClearInput] = useState({});
  const [isFiltered, setIsFiltered] = useState(false);

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

  const showFilteredProducts = (searchFormData: ISearchFormData) => {
    const filterProduct = productsList.filter((product) => {
      return (
        product.name
          .toUpperCase()
          .includes(searchFormData.search.toUpperCase()) ||
        product.category
          .toUpperCase()
          .includes(searchFormData.search.toUpperCase())
      );
    });
    setProductsList(filterProduct);
  };

  // *Adicionar ao carrinho*:
  const addProductToCart = (productId: number) => {
    if (cartProducts.find((product) => product.id === productId)) {
      toast.error("O item já foi adicionado ao carrinho", {
        autoClose: 2000,
      });
    } else {
      const productAdd = productsList.find(
        (product) => product.id === productId
      );
      setCartProducts([...cartProducts, productAdd]);
    }
  };

  // *Remover do carrinho*:
  const removeProductFromCart = (productId: number) => {
    const newCartList = cartProducts.filter(
      (product) => product.id !== productId
    );
    setCartProducts(newCartList);
  };

  const removeAll = () => {
    setCartProducts([]);
  };

  return (
    <CartContext.Provider
      value={{
        productsList,
        setProductsList,
        isCartModalOpen,
        setIsCartModalOpen,
        cartProducts,
        filteredProducts,
        setFilteredProducts,
        clearInput,
        setClearInput,
        isFiltered,
        setIsFiltered,
        showFilteredProducts,
        addProductToCart,
        removeProductFromCart,
        removeAll,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// const showFilteredProducts = (searchFormData: ISearchFormData) => {
//   const filterProduct = productsList.filter((product) => {
//     return searchProduct.search === ""
//       ? true
//       : product.name
//           .toUpperCase()
//           .includes(searchFormData.search.toUpperCase()) ||
//           product.category
//             .toUpperCase()
//             .includes(searchFormData.search.toUpperCase());
//   });
//   setProductsList(filterProduct);
//   // console.log(filterProduct);
// };
