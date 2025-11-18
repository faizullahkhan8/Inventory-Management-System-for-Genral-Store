import { ChevronLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ title }) => {
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);

    const prevRoute = searchParams.get("prevRoute");

    return (
        <div className="flex gap-2 items-center w-full py-2 px-4 border-b border-gray-100 bg-gray-50">
            <Link to={prevRoute}>
                <ChevronLeft
                    size={20}
                    className="hover:bg-gray-200 w-6 h-6 rounded-full transition-colors duration-200"
                />
            </Link>
            <h1 className="text-lg text-gray-700 font-semibold">{title}</h1>
        </div>
    );
};

export default Header;
