import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./App.jsx";
import store, { persistor } from "./store/store.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <Toaster position="top-right" reverseOrder={false} />
        <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router}>
                <App />
            </RouterProvider>
        </PersistGate>
    </Provider>
);
