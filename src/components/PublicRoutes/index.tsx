import { Loading } from "../Loading";
import { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoutes = () => {
  const { loading } = useContext(UserContext);

  const userToken = localStorage.getItem("@TOKEN");

  if (loading) {
    return <Loading />;
  }

  if (userToken) {
    return <Navigate to="/shop" />;
  }

  return <Outlet />;
};
