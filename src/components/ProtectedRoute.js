import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import CryptoLoader from "./loader";
export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <CryptoLoader />;
    if (!user) {
        return <Navigate to="/SignIn" />
    }
    return children;
};
