import { Navigate, Outlet } from "react-router";
import type { User } from "../features/users/types/types";

const ProtectedRoute = ({ user }: { user: User | null }) => {
  const isAdmin = user?.role === "admin";

  return isAdmin
    ? <Outlet />
    : <Navigate to="/" replace />;
};

export default ProtectedRoute;