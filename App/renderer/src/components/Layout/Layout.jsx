import { Outlet } from "react-router-dom";
import SidebarComponet from "./Sidebar";

const Layout = () => {
    return (
        <div className="flex h-screen w-full">
            <div>
                <SidebarComponet />
            </div>

            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
