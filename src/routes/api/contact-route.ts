import express from 'express';
import handlerContactFormSubmit from "../../api/contact.js";
import validateContactForm from "../../middleware/contact-form-validator.js";
import { asyncHandler } from "../../lib/helpers.js";

export const apiContactRoute = express.Router();

// use middleware here
apiContactRoute.use(validateContactForm);
apiContactRoute.post("/form-submit", asyncHandler(handlerContactFormSubmit));