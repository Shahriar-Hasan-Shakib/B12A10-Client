// PrivateRoute Component - Protected route wrapper
import { Navigate, useLocation } from "react-router";
import { useAuth } from "@src/hooks/useAuth";
import { AUTH } from "@src/constants/routes";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={AUTH} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
