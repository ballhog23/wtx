import type { Request, Response, NextFunction } from "express";

const STATUS_HEADINGS: Record<number, string> = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
};

const DEFAULT_HEADING = "Something Went Wrong";

export async function handlerServeErrorPage(
    err: Error & { status?: number; statusCode?: number; },
    _: Request,
    res: Response,
    __: NextFunction
) {
    console.log('did i make it');
    const statusCode = err.status ?? err.statusCode ?? 500;
    const heading = STATUS_HEADINGS[statusCode] ?? DEFAULT_HEADING;
    const message = statusCode >= 500
        ? "Something went wrong on our end."
        : err.message;

    if (statusCode >= 500) console.error(err.message);


    res.status(statusCode).render("pages/error-page", {
        title: heading,
        page: "ERROR",
        description: "error page",
        statusCode,
        heading,
        message,
    });
}
