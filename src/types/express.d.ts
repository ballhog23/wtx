// types/express.d.ts
import express from 'express';
import type { ContactFormSchema } from "../shared/contact-form-schema.js";

declare global {
	namespace Express {
		interface Request {
			validatedContactFormInput?: ContactFormSchema;
		}
	}
}
