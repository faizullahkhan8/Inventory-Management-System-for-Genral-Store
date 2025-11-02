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
} from "lucide-react";

import { useLogin } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

import { setUser } from "../store/Slices/user.slice";
import { persistor } from "../store/store";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Checkbox } from "../ui/Checkbox";
import { Card } from "../ui/Card";
import { useDispatch } from "react-redux";

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
        <div className="min-h-screen flex">
            {/* ---------------- LEFT SIDE PANEL ---------------- */}
            <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-blue-600 via-blue-700 to-blue-900 p-12 flex-col text-white">
                {/* Logo */}
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                            <Package className="w-7 h-7" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold">InventoryPro</h1>
                            <p className="text-sm text-blue-200">
                                Business Management Suite
                            </p>
                        </div>
                    </div>

                    {/* App Text */}
                    <h2 className="text-3xl font-bold mb-4">
                        Inventory Management System
                    </h2>
                    <p className="text-lg text-blue-100 leading-relaxed">
                        Manage inventory, track sales & analyze business
                        statistics.
                    </p>
                </div>

                {/* Developer Info */}
                <div className="border-t border-white/20 pt-6">
                    <p className="text-sm font-medium text-blue-100 mb-3">
                        Developed By
                    </p>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-semibold">Faiz Ullah Khan</p>
                            <p className="text-sm text-blue-200">
                                Full Stack Developer
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center flex-col gap-2 ml-8">
                        <a
                            href="https://github.com/faizullahkhan8"
                            className="text-blue-200 hover:underline flex items-center gap-2"
                            target="__blank"
                        >
                            <Github />
                            https://github.com/faizullahkhan8
                        </a>

                        <a
                            href="mailto:faizullahofficial0@gmail.com"
                            className="text-blue-200 hover:underline flex items-center gap-2"
                            target="__blank"
                        >
                            <MailIcon />
                            faizullahofficial0@gmail.com
                        </a>

                        <a
                            href="https://wa.me/923328753452?text=Hello%20I%20want%20to%20contact%20you"
                            className="text-blue-200 hover:underline flex items-center gap-2"
                            target="__blank"
                        >
                            <Contact />
                            <p> +92 332 8753452</p>
                        </a>
                    </div>
                </div>
            </div>

            {/* ---------------- RIGHT SIDE LOGIN FORM ---------------- */}
            <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Logo (mobile) */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                <Package className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">
                                    InventoryPro
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Business Management
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card */}
                    <Card className="p-8 shadow-lg border-0">
                        <h2 className="text-2xl font-bold text-center mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-center text-gray-600 mb-8">
                            Sign in to access your dashboard
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Username */}
                            <div className="space-y-2">
                                <Label>Username</Label>

                                <div className="relative">
                                    <User className="absolute left-[5%] top-[50%] -translate-x-1/2 -translate-y-1/2 text-gray-400" />

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

                            {/* Password */}
                            <div className="space-y-2">
                                <Label>Password</Label>

                                <div className="relative">
                                    <Lock className="absolute left-[5%] top-[50%] -translate-x-1/2 -translate-y-1/2 text-gray-400" />

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

                                    {/* Toggle icon */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-[0%] top-[50%] -translate-x-1/2 -translate-y-1/2 text-gray-500"
                                    >
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember me */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={rememberMe}
                                        onChange={() => {
                                            setRememberMe((prev) => !prev);
                                        }}
                                    />
                                    <Label className="cursor-pointer">
                                        Remember me
                                    </Label>
                                </div>

                                <button className="text-sm text-blue-600 hover:underline">
                                    Forgot Password?
                                </button>
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-11"
                                size="lg"
                            >
                                {loading ? <Loader /> : "Sign In"}
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Login;
