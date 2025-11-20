import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RootLayout from "./components/Layout/Layout.jsx";
import NotFound from "./pages/NotFound.jsx";
import Inventory from "./pages/Inventory.jsx";
import AddProductPage from "./pages/AddProductPage.jsx";
import ViewProductPage from "./pages/ViewProductPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <RootLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/inventory",
                element: <Inventory />,
            },
            {
                path: "/inventory/add-product",
                element: <AddProductPage />,
            },
            {
                path: "/inventory/view-product/:id",
                element: <ViewProductPage />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
    {
        path: "/auth/login",
        element: <Login />,
    },
]);

export default router;
