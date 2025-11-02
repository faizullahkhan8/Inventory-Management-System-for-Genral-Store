import { ErrorResponse } from "../utils/ErrorResponse.js";

const errorHandler = (err, req, res, next) => {
    // ✅ If error is not instance of ErrorResponse, convert it
    if (!(err instanceof ErrorResponse)) {
        err = new ErrorResponse(
            err.message || "Internal Server Error",
            err.statusCode || 500
        );
    }

    let { message, statusCode } = err;

    // Optional: handle MongoDB cast errors (invalid ObjectId)
    if (err.name === "CastError") {
        err = new ErrorResponse("Resource not found", 404);
        message = err.message;
        statusCode = err.statusCode;
    }

    // Optional: handle Mongo duplicate key error
    if (err.code === 11000) {
        err = new ErrorResponse("Duplicate field value entered", 400);
        message = err.message;
        statusCode = err.statusCode;
    }

    res.status(statusCode).json({
        success: false,
        error: message,
    });
};

export default errorHandler;
