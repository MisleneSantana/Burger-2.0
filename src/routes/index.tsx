import { Routes, Route } from "react-router-dom";
import { RouteProtection } from "../components/RouteProtection";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { ShopPage } from "../pages/ShopPage";
import { NotFound } from "../pages/NotFound";
import { PublicRoutes } from "../components/PublicRoutes";

const RoutesMain = () => {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        {/* Outlet PublicRoutes: */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<RouteProtection />}>
        {/* Outlet RouteProtection: */}
        <Route path="/shop" element={<ShopPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesMain;
