import React, { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getData} from "../services/api"; // Define ApiResponse type
import { login, checkAuth, logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const dispatch = useDispatch();
  const isAuth: boolean = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response= await getData(`/user/check-auth`);
        dispatch(checkAuth(response));
      } catch (error) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [dispatch]);

  if (loading) {
    
    return <div>Loading...</div>;
  }

  return isAuth ? <>{children}</> : <Navigate to="/login" />;
 
};



export default PrivateRoute;
