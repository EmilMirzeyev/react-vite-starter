import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const AuthProtectedRoute = () => {
  const isAuth = true;
  const userData = true;
  const userError = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (userError) navigate("/login");
  }, [navigate, userError]);

  if (!isAuth) return <Navigate to="/login" replace />;
  return userData ? <Outlet /> : <h1>Loading...</h1>;
};

export default AuthProtectedRoute;
