class ErrorHandler {
    static notFoundError(message = "Not found") {
        const error = new Error(message);
        error.status = 404;
        return error;
    }

    static badRequestError(message = "Bad request") {
        const error = new Error(message);
        error.status = 400;
        return error;
    }

    static unauthorizedError(message = "Unauthorized") {
        const error = new Error(message);
        error.status = 401;
        return error;
    }

    static forbiddenError(message = "Forbidden") {
        const error = new Error(message);
        error.status = 403;
        return error;
    }
}

export default ErrorHandler;
