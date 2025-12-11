import asyncHandler from "express-async-handler";
import { ErrorResponse } from "../utils/ErrorResponse.js";
import User from "../models/user.model.js";
import UserDTO from "../dto/user.dto.js";

export const registerUser = asyncHandler(async (req, res, next) => {
    try {
        if (!req.body)
            return next(new ErrorResponse("Request body is null", 400));
        const { fullname, username, contactNo, password, developerSecret } =
            req.body;
        if ((!fullname, !username, !password, !contactNo, !developerSecret)) {
            return next(
                new ErrorResponse("Please provide all required fields", 400)
            );
        }

        if (developerSecret !== process.env.DEVELOPER_SECRET) {
            return next(new ErrorResponse("Invalid developer secret", 403));
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return next(new ErrorResponse("Username already exists", 400));
        }
        const newUser = new User({
            fullname,
            username,
            password,
            contactNo,
            lastLogin: Date.now(),
        });
        await newUser.save();

        req.session.user = { id: newUser._id, username: newUser.username };

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: new UserDTO(newUser),
        });
    } catch (error) {
        console.log("Error in Register User Controller.", error.message);
        return next(new ErrorResponse("Internal server error.", 500));
    }
});

export const loginUser = asyncHandler(async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if ((!username, !password)) {
            return next(
                new ErrorResponse("Please provide username and password", 400)
            );
        }

        const user = await User.findOne({ username }).select("+password");
        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }
        req.session.user = { id: user._id, username: user.username };
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: new UserDTO(user),
        });
    } catch (error) {
        console.log("Error in Login User Controller.", error.message);
        return next(new ErrorResponse("Internal server error.", 500));
    }
});

export const logoutUser = asyncHandler(async (req, res, next) => {
    try {
        req.session.destroy();

        return res.status(200).json({
            success: "true",
            message: "User logged out successfully.",
        });
    } catch (error) {
        console.log("Error in logout User Controller", error.message);
        return next(new ErrorResponse("Internal server error.", 500));
    }
});
