import { Outlet } from "react-router-dom";
import SidebarComponet from "./Sidebar";

const Layout = () => {
    return (
        <div>
            <SidebarComponet />
            <Outlet />
        </div>
    );
};
export default Layout;
