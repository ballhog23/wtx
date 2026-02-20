import { Request, Response } from "express";
export async function handlerServeIndex(req: Request, res: Response) {
    return res.render('pages/index', {
        page: 'index',
        description: 'this is the index page'
    });
}
