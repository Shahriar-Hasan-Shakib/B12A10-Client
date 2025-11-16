// #PRIVATE_ROUTE: Protected route wrapper component
// #AUTH: Checks user authentication before rendering children
// #ROUTING: Redirects to login if not authenticated, preserves intended location
// PrivateRoute Component - Protected route wrapper
import { Navigate, useLocation } from "react-router";
import { useAuth } from "@src/hooks/useAuth";
import { AUTH } from "@src/constants/routes";
import { LoadingScreen } from "../ui";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, loading } = useAuth();
  // #ROUTING: Store current location to redirect back after login
  const location = useLocation();

  // #UI: Show loading state while checking authentication
  if (loading) {
    return <LoadingScreen />;
  }
  // #AUTH: Redirect to login if user is not authenticated
  // #ROUTING: Save current location in state to redirect back after login
  if (!user) {
    return <Navigate to={AUTH} state={{ from: location }} replace />;
  }

  // #AUTH: User is authenticated, render protected content
  return <>{children}</>;
};
