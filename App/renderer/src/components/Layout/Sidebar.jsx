import Logo from "../../assets/StockPilot-removebg-preview.png";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";

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
    SidebarIcon,
    Loader,
    BoxesIcon,
} from "lucide-react";
import { useState } from "react";
import { useLogout } from "../../api/Hooks/auth.api";

const SidebarComponent = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showSidebarIcon, setShowSidebarIcon] = useState(false);

    const navigate = useNavigate();

    const { loading, logout } = useLogout();

    return (
        <Sidebar
            collapsed={isCollapsed}
            rootStyles={{
                width: "300px",
                height: "100vh",
                "& .ps-sidebar-root": {
                    maxHeight: "100vh",
                },
            }}
        >
            {/* Logo Section */}
            <Menu
                rootStyles={{
                    padding: "10px",
                    "& .ps-menu-button": {
                        padding: isCollapsed ? "0px 10px" : "0px 0px",
                    },
                }}
            >
                <MenuItem
                    icon={
                        <div
                            className="relative w-[50px] h-[50px] flex items-center justify-center"
                            onMouseEnter={() => setShowSidebarIcon(true)}
                            onMouseLeave={() => setShowSidebarIcon(false)}
                        >
                            {showSidebarIcon && isCollapsed ? (
                                <SidebarIcon
                                    className="cursor-e-resize"
                                    onClick={() =>
                                        setIsCollapsed((pre) => !pre)
                                    }
                                />
                            ) : (
                                <img
                                    onClick={() => navigate("/")}
                                    src={Logo}
                                    alt="logo"
                                    loading="lazy"
                                    className="w-full h-full object-contain cursor-pointer"
                                />
                            )}
                        </div>
                    }
                    rootStyles={{
                        "&:hover, & .ps-menu-button:hover": {
                            backgroundColor: "transparent !important",
                        },
                        "& .ps-menu-icon": {
                            width: "60px",
                        },
                        "& .ps-menu-icon img": {
                            width: "50px",
                        },
                    }}
                >
                    <div className="flex items-center justify-between">
                        <div className="leading-none">
                            <h1 className="font-bold text-lg text-primary">
                                StockPilot
                            </h1>
                            <div className="w-full h-[1.5px] bg-black" />
                            <span className="text-sm font-bold opacity-50">
                                Inventory Management <br /> System
                            </span>
                        </div>
                        <SidebarIcon
                            size={20}
                            className="cursor-e-resize"
                            onClick={() => setIsCollapsed((pre) => !pre)}
                        />
                    </div>
                </MenuItem>
            </Menu>

            <Menu
                rootStyles={{
                    padding: isCollapsed ? "0px" : "10px",
                    "& .ps-menu-button": {
                        height: "36px",
                    },
                }}
            >
                {isCollapsed ? (
                    <div className="w-full h-0.5 bg-black/70 my-2!"></div>
                ) : (
                    <div className="my-2! text-[11px] font-semibold uppercase opacity-60 text-">
                        Main Menu
                    </div>
                )}
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
                <MenuItem
                    icon={<BoxesIcon width={20} />}
                    component={<Link to="/catogory" />}
                >
                    Category
                </MenuItem>
                {isCollapsed ? (
                    <div className="w-full h-0.5 bg-black/70 my-2!"></div>
                ) : (
                    <div className="my-2! text-[11px] font-semibold uppercase opacity-60">
                        Other
                    </div>
                )}
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
                    onClick={async () => {
                        const data = await logout();
                        if (data.success) {
                            navigate("/auth/login");
                        }
                    }}
                    icon={<LogOut width={20} style={{ rotate: "180deg" }} />}
                >
                    {loading ? <Loader /> : "Logout"}
                </MenuItem>
            </Menu>
        </Sidebar>
    );
};

export default SidebarComponent;
