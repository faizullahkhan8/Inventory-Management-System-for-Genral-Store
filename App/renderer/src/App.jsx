import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RootLayout from "./components/Layout/Layout.jsx";
import NotFound from "./pages/NotFound.jsx";
import Inventory from "./pages/Inventory.jsx";
import TrashPage from "./pages/TrashPage.jsx";
import Register from "./pages/Register.jsx";
import BillingPage from "./pages/BillingPage.jsx";
import AddBillPage from "./pages/AddBill.jsx";
import EditBill from "./pages/EditBill.jsx";

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
                path: "/trash",
                element: <TrashPage />,
            },
            {
                path: "/billing",
                element: <BillingPage />,
            },
            {
                path: "/billing/add-bill",
                element: <AddBillPage />,
            },
            {
                path: "/billing/edit-bill/:id",
                element: <EditBill />,
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
