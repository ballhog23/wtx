import type { ContactFormFieldError } from "../shared/contact-form-definition.js";
import { respondWithJSON } from "../lib/json.js";
import { contactFormSchema } from "../shared/contact-form-schema.js";
import type { Request, Response, NextFunction } from 'express';


const validateContactForm = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { body } = req;
    const validatedInput = contactFormSchema.safeParse(body);

    if (validatedInput.success) {
        req.validatedContactFormInput = validatedInput.data;
        return next();
    }

    const errors = validatedInput.error.issues.map(errorObj => {
        const name = String(errorObj.path[0]); // key of object maps to input element on frontend
        const errorMessage = errorObj.message;

        return {
            name,
            errorMessage
        } satisfies ContactFormFieldError;
    });

    return respondWithJSON(res, 400, { errors });
};

export default validateContactForm;
