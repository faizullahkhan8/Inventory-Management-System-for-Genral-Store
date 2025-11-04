import Logo from "../../assets/StockPilot-removebg-preview.png";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import {
    LayoutDashboard,
    Package,
    Receipt,
    FileText,
    TrendingUp,
    BarChart3,
    Users,
    Settings,
    User,
    LogOut,
} from "lucide-react";

const SidebarComponent = () => {
    return (
        <Sidebar
            rootStyles={{
                width: "100%",
            }}
            className="h-screen"
        >
            {/* Logo Section */}
            <Menu
                rootStyles={{
                    padding: "10px",
                }}
            >
                <MenuItem
                    component={<Link to="/" />}
                    icon={
                        <img
                            src={Logo}
                            alt="logo"
                            className="w-12 object-contain"
                        />
                    }
                    rootStyles={{
                        "&:hover": {
                            backgroundColor: "transparent !important",
                        },
                        "& .ps-menu-button:hover": {
                            backgroundColor: "transparent !important",
                        },
                    }}
                >
                    <div className="leading-none">
                        <h1 className="font-bold text-lg">StockPilot</h1>
                        <span className="text-xs opacity-70">
                            Inventory Management System
                        </span>
                    </div>
                </MenuItem>
            </Menu>
            <Menu
                rootStyles={{
                    padding: "10px 10px",
                    "& .ps-menu-button": {
                        height: "36px",
                    },
                }}
            >
                {/* -------- MENU TITLE -------- */}
                <div className="mb-4! text-[11px] font-semibold uppercase opacity-60">
                    Main Menu
                </div>

                {/* -------- MAIN MENU -------- */}
                <MenuItem
                    icon={<LayoutDashboard width={20} />}
                    component={<Link to="/" />}
                >
                    Dashboard
                </MenuItem>
                <MenuItem
                    icon={<Package width={20} />}
                    component={<Link to="/inventory" />}
                >
                    Inventory
                </MenuItem>
                <MenuItem
                    icon={<Receipt width={20} />}
                    component={<Link to="/dues" />}
                >
                    Dues
                </MenuItem>
                <MenuItem
                    icon={<FileText width={20} />}
                    component={<Link to="/billings" />}
                >
                    Billings
                </MenuItem>
                <MenuItem
                    icon={<TrendingUp width={20} />}
                    component={<Link to="/profitloss" />}
                >
                    Profit & Loss
                </MenuItem>
                <MenuItem
                    icon={<BarChart3 width={20} />}
                    component={<Link to="/reports" />}
                >
                    Reports
                </MenuItem>
                <MenuItem
                    icon={<Users width={20} />}
                    component={<Link to="/suppliers" />}
                >
                    Suppliers
                </MenuItem>

                {/* -------- SETTINGS -------- */}
                <div className="my-4! text-[11px] font-semibold uppercase opacity-60">
                    Other
                </div>
                <MenuItem
                    icon={<Settings width={20} />}
                    component={<Link to="/settings" />}
                >
                    Settings
                </MenuItem>
                <MenuItem
                    icon={<User width={20} />}
                    component={<Link to="/settings" />}
                >
                    Account
                </MenuItem>
                <MenuItem
                    rootStyles={{
                        "& .ps-menu-button:hover": {
                            backgroundColor: "rgba(255, 0, 0, 0.1) !important",
                        },
                    }}
                    onClick={() => {
                        console.log("logout");
                    }}
                    icon={<LogOut width={20} style={{ rotate: "180deg" }} />}
                >
                    Logout
                </MenuItem>
            </Menu>
        </Sidebar>
    );
};

export default SidebarComponent;
