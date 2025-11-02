import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const user = useSelector((state) => state.user);

    if (!user?.isLoggedIn) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
