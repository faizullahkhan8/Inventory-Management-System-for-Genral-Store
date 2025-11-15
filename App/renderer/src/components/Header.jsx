import React from "react";

const Header = ({ title }) => {
    return (
        <div className="w-full py-2 px-4 border-b border-gray-100 bg-gray-50">
            <h1 className="text-lg text-gray-700 font-semibold">{title}</h1>
        </div>
    );
};

export default Header;
