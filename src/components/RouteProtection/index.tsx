import { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { Navigate, Outlet } from "react-router-dom";
import { Loading } from "../Loading";
import { CartProvider } from "../../providers/CartProvider";

export const RouteProtection = () => {
  const { loading } = useContext(UserContext);

  const userToken = localStorage.getItem("@TOKEN");

  if (loading) {
    return <Loading />;
  }

  if (!userToken) {
    return <Navigate to="/" />;
  }

  return (
    <CartProvider>
      <Outlet />
    </CartProvider>
  );
};
