import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RootLayout from "./components/Layout/Layout.jsx";
import NotFound from "./pages/NotFound.jsx";
import Inventory from "./pages/Inventory.jsx";
import AddProductPage from "./pages/AddProductPage.jsx";
import ViewProductPage from "./pages/ViewProductPage.jsx";
import EditProductPage from "./pages/EditProductPage.jsx";
import TrashPage from "./pages/TrashPage.jsx";
import SupplierPage from "./pages/SupplierPage.jsx";
import Register from "./pages/Register.jsx";
import AddSupplierPage from "./pages/AddSupplierPage.jsx";
import ViewSupplierPage from "./pages/ViewSupplierPage.jsx";
import EditSupplierPage from "./pages/EditSupplierPage.jsx";

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
                path: "/inventory/edit-product/:id",
                element: <EditProductPage />,
            },
            {
                path: "/trash",
                element: <TrashPage />,
            },
            {
                path: "/suppliers",
                element: <SupplierPage />,
            },
            {
                path: "/suppliers/add-supplier",
                element: <AddSupplierPage />,
            },
            {
                path: "/suppliers/view-supplier/:id",
                element: <ViewSupplierPage />,
            },
            {
                path: "/suppliers/edit-supplier/:id",
                element: <EditSupplierPage />,
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
    {
        path: "/auth/register",
        element: <Register />,
    },
]);

export default router;
