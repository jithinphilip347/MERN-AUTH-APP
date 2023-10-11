import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { adminInfo } = useSelector((state) => state.adminAuth);

  return adminInfo ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" replace></Navigate>
  );
};

export default PrivateRoute;
