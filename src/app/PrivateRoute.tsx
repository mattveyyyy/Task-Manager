import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { type RootState } from "./store";

export const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  if (loading) return <div>Загрузка...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

