// houses schemas for validation
import * as z from "zod";
import { contactFormFieldsDefinition } from "./contact-form-definition.js";

const { name, email, phone, subject, message } = contactFormFieldsDefinition;

const stripDangerousChars = (val: string) => val.replace(/[\r\n\0]/g, '');

const encodeHTMLEntities = (val: string) =>
    val.replace(/&/g, '&amp;')
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&#x27;');

const nameError = { error: name.errorMessage };
const nameInput =
    z.string(nameError)
        .trim()
        .refine(val =>
            val.length >= name.minLength && val.length <= name.maxLength,
            nameError
        )
        .transform(val => encodeHTMLEntities(stripDangerousChars(val)));

// zod will throw as many errors it encounters with validation which is great
// but I just want one error message per validation check so refine is the play
// we could break them into separate refine functions which may be more readable and add abort: true
const emailError = { error: email.errorMessage };
const emailInput =
    z.string()
        .trim()
        .refine(val =>
            val.length >= email.minLength && val.length <= email.maxLength && val.match(z.regexes.html5Email),
            emailError
        )
        .transform(val => stripDangerousChars(val));

if (!phone.regex)
    throw new Error("Phone regex missing from contact-form-definition.ts");

const phoneError = { error: phone.errorMessage };
const phoneInput =
    z.string()
        .trim()
        .refine(val => val === '' || phone.regex!.test(val), phoneError)
        .transform(val => val.replace(/\0/g, ''))
        .optional();

const subjectError = { error: subject.errorMessage };
const subjectInput =
    z.string()
        .trim()
        .refine(val =>
            val.length >= subject.minLength && val.length <= subject.maxLength,
            subjectError
        )
        .transform(val => encodeHTMLEntities(stripDangerousChars(val)));

const messageError = { error: message.errorMessage };
const messageInput =
    z.string()
        .trim()
        .refine(val =>
            val.length >= message.minLength && val.length <= message.maxLength,
            messageError
        )
        .transform(val => encodeHTMLEntities(val.replace(/[\r\0]/g, '')));

export const contactFormSchema = z.strictObject({
    name: nameInput,
    email: emailInput,
    phone: phoneInput,
    subject: subjectInput,
    message: messageInput
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
