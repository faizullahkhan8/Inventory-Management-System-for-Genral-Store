import { useState } from "react";
import {
    Eye,
    EyeOff,
    Lock,
    User,
    Github,
    Loader,
    Phone,
    Mail,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useRegister } from "../api/Hooks/auth.api";
import { useNavigate } from "react-router-dom";

import { setUser } from "../store/Slices/user.slice";
import { persistor } from "../store/store";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Checkbox } from "../ui/Checkbox";
import { Card } from "../ui/Card";
import { useDispatch } from "react-redux";

import logo from "../assets/StockPilot-removebg-preview.png";

const Register = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        contactNo: "",
        password: "",
        confirmPassword: "",
        developerSecret: "mydevelopersecretkey", // Default value for developer secret only in development
    });
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { loading, register } = useRegister();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const data = await register(formData);
        if (data) {
            dispatch(setUser({ ...data.user, isLoggedIn: true }));
            if (!rememberMe) {
                persistor.pause();
                persistor.flush().then(() => {
                    persistor.purge();
                });
            } else {
                persistor.persist();
            }
            navigate("/?page=dashboard");
        }
    }

    return (
        <div className="neon-bg min-h-screen flex bg-gray-50/60!">
            <div className="neon-blob blob-blue"></div>
            <div className="neon-blob blob-purple"></div>
            <div className="neon-blob blob-cyan"></div>
            <div className="neon-blob blob-orange"></div>
            {/* ---------------- LEFT SIDE PANEL ---------------- */}
            <div className="hidden lg:flex lg:w-1/2 p-12 flex-col ">
                {/* Logo */}
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center">
                            <img src={logo} className="w-20 h-20" />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="leading-none">
                                <h1 className="font-bold text-3xl text-blue-600">
                                    StockPilot
                                </h1>
                                <hr />
                                <span className="text-sm font-bold opacity-70">
                                    Inventory Management <br /> System
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* App Text */}
                    <h2 className="text-3xl font-bold mb-4 text-blue-600">
                        Inventory Management System
                    </h2>
                    <p className="text-lg leading-relaxed">
                        Manage inventory, track sales & analyze business
                        statistics.
                    </p>
                </div>

                {/* Developer Info */}

                <div className="border-t border-white/30 pt-6">
                    <p className="text-sm font-medium mb-3 opacity-80">
                        Developed By
                    </p>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-semibold">Faiz Ullah Khan</p>
                            <p className="text-sm opacity-80">
                                Full Stack Developer
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm opacity-90">
                        <a
                            href="https://github.com/faizullahkhan8"
                            className="hover:underline flex items-center gap-2"
                            target="_blank"
                        >
                            <Github className="w-4 h-4" />
                            github.com/faizullahkhan8
                        </a>
                        <a
                            href="mailto:faizullahofficial0@gmail.com"
                            className="hover:underline flex items-center gap-2"
                            target="_blank"
                        >
                            <Mail className="w-4 h-4" />
                            faizullahofficial0@gmail.com
                        </a>
                        <a
                            href="https://wa.me/923328753452"
                            className="hover:underline flex items-center gap-2"
                            target="_blank"
                        >
                            <Phone className="w-4 h-4" />
                            +92 332 8753452
                        </a>
                    </div>
                </div>
            </div>

            {/* ---------------- RIGHT SIDE REGISTER FORM ---------------- */}
            <div className="flex-1 flex items-center justify-center p-6">
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
                        <div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center">
                            <img src={logo} className="w-20 h-20" />
                        </div>
                        <div>
                            <h1 className="font-bold text-2xl text-blue-600">
                                StockPilot
                            </h1>
                            <p className="text-xs text-gray-600">
                                Inventory Management
                            </p>
                        </div>
                    </div>

                    {/* Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                        <h2 className="text-2xl font-bold text-center mb-1 text-gray-800">
                            Create Account
                        </h2>
                        <p className="text-center text-gray-500 text-sm mb-5">
                            Register to get started with StockPilot
                        </p>

                        <div onSubmit={handleSubmit} className="space-y-3">
                            {/* Fullname & Username Row */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label className="mb-2">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            type="text"
                                            name="fullname"
                                            placeholder="Enter your full name"
                                            value={formData.fullname}
                                            onChange={handleChange}
                                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="mb-2">Username</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            type="text"
                                            name="username"
                                            placeholder="Enter your username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Contact */}
                            <div>
                                <Label className="mb-2">Contact</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        type="text"
                                        name="contactNo"
                                        placeholder="+92 300 1234567"
                                        value={formData.contactNo}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                                    />
                                </div>
                            </div>

                            {/* Password & Confirm Password Row */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label className="mb-2">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            type={
                                                showPassword.password
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="password"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full pl-9 pr-9 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword((prev) => ({
                                                    ...prev,
                                                    password: !prev.password,
                                                }))
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword.password ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <Label className="mb-2">Confirm</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            type={
                                                showPassword.confirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="confirmPassword"
                                            placeholder="••••••••"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full pl-9 pr-9 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword((prev) => ({
                                                    ...prev,
                                                    confirmPassword:
                                                        !prev.confirmPassword,
                                                }))
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword.confirmPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Developer Secret */}
                            <div>
                                <Label className="mb-2">Developer Secret</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        type="password"
                                        name="developerSecret"
                                        placeholder="Enter secret key"
                                        value={formData.developerSecret}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                                    />
                                </div>
                            </div>

                            {/* Remember me & Forgot Password */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={rememberMe}
                                        onChange={() => {
                                            setRememberMe((prev) => !prev);
                                        }}
                                    />
                                    <Label
                                        className="cursor-pointer"
                                        onClick={() =>
                                            setRememberMe((pre) => !pre)
                                        }
                                    >
                                        Remember me
                                    </Label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? (
                                    <>
                                        <Loader className="w-4 h-4 animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>

                            {/* Sign In Link */}
                            <p className="text-center text-sm text-gray-600 pt-2">
                                Already have an account?{" "}
                                <Link
                                    to="/auth/login"
                                    className="text-blue-600 font-medium hover:underline"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
