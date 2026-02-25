import { Request, Response } from "express";

export async function handlerServeAbout(req: Request, res: Response) {
    return res.render('pages/about', {
        page: 'about',
        title: 'About | WTX WAX Collectibles',
        description: 'Learn about WTX Wax Collectibles — West Texas\'s premier destination for sports cards, Pokémon TCG, and rare collectibles.'
    });
}
