import asyncHandler from "express-async-handler";
import ErrorResponse from "../utils/ErrorResponse";
import User from "../models/user.model";

export const registerUser = asyncHandler(async (req, res, next) => {
    try {
        const { fullname, username, contact, password } = req.body;
        if ((!fullname, !username, !password, !contact)) {
            return next(
                new ErrorResponse("Please provide all required fields", 400)
            );
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return next(new ErrorResponse("Username already exists", 400));
        }
        const newUser = new User({ fullname, username, password, contact });
        await newUser.save();
        res.status(201).json({
            success: true,
            message: "User registered successfully",
        });
    } catch (error) {
        console.log("Error in Register User Controller.", error.message);
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
        });
    } catch (error) {
        console.log("Error in Login User Controller.", error.message);
    }
});
