import { sendEmail } from "../services/contact-form-ses.js";
import { respondWithJSON } from "../lib/json.js";
import type { Request, Response } from "express";

export default async function handlerContactFormSubmit(req: Request, res: Response) {
    const { validatedContactFormInput } = req;
    if (!validatedContactFormInput)
        throw new Error("contact form info not attached to request object");

    await sendEmail(validatedContactFormInput);
    respondWithJSON(res, 200, { message: 'email sent, thank you!' });
}