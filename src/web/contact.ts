import { Request, Response } from "express";

export async function handlerServeContact(req: Request, res: Response) {
    return res.render('pages/contact', {
        page: 'contact',
        title: 'Contact | WTX WAX Collectibles',
        description: 'Get in touch with WTX WAX Collectibles. Send us a message, visit our store, or give us a call.'
    });
}
