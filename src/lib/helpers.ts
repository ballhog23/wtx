import type { Request, Response, NextFunction, RequestHandler } from "express";
export type AsyncRequestHandler<P = Record<string, any>> = (
    req: Request<P>,
    res: Response,
    next: NextFunction
) => Promise<void>;

export const asyncHandler = <P = Record<string, any>>(fn: AsyncRequestHandler<P>): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req as Request<P>, res, next)).catch(next);
    };
};
