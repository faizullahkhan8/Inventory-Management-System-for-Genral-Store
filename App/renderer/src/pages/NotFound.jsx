import React from "react";
import { Card } from "../ui/Card";
import NotFoundImg from "../assets/not-found.png";
import { Label } from "../ui/Label";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <Card className="flex items-center justify-center p-8! w-[400px]!">
                <img
                    src={NotFoundImg}
                    alt=""
                    className="w-full h-64 object-contain"
                />
                <Label>
                    Go Back to{" "}
                    <Link to={"/"} className="text-l text-blue-400 underline">
                        Home
                    </Link>
                </Label>
            </Card>
        </div>
    );
};

export default NotFound;
