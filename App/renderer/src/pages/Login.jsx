import { useState } from "react";
import {
    Eye,
    EyeOff,
    Lock,
    User,
    Package,
    Github,
    MailIcon,
    Contact,
    Loader,
    Phone,
    Mail,
} from "lucide-react";

import { useLogin } from "../api/Hooks/auth.api";
import { Link, useNavigate } from "react-router-dom";

import { setUser } from "../store/Slices/user.slice";
import { persistor } from "../store/store";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Checkbox } from "../ui/Checkbox";
import { Card } from "../ui/Card";
import { useDispatch } from "react-redux";

import logo from "../assets/StockPilot-removebg-preview.png";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { login, loading } = useLogin();

    async function handleSubmit(e) {
        e.preventDefault();
        const data = await login(username, password);

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

            {/* ---------------- RIGHT SIDE LOGIN FORM ---------------- */}

            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
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

                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
                            Welcome Back
                        </h2>
                        <p className="text-center text-gray-500 text-sm mb-6">
                            Sign in to access your dashboard
                        </p>

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <Label>Username</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="pl-10 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <Checkbox
                                        checked={rememberMe}
                                        onChange={() =>
                                            setRememberMe(!rememberMe)
                                        }
                                    />
                                    <Label
                                        className="cursor-pointer mb-0"
                                        onClick={() =>
                                            setRememberMe(!rememberMe)
                                        }
                                    >
                                        Remember me
                                    </Label>
                                </label>
                                <button
                                    type="button"
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            <Button
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? (
                                    <>
                                        <Loader className="w-5 h-5 animate-spin" />
                                        Signing In...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>

                            <div className="text-center pt-2">
                                <p className="text-sm text-gray-600">
                                    Not yet registered?{" "}
                                    <Link
                                        to="/auth/register"
                                        className="text-blue-600 font-medium hover:underline"
                                    >
                                        Register here
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
