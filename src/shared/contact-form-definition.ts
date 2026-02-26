export type ContactFormFieldDefinition = {
    name: string;
    errorMessage: string;
    minLength: number;
    maxLength: number;
    regex: RegExp | null;
    optional: boolean;
};

export type ContactFormFieldError = Pick<ContactFormFieldDefinition, "name" | "errorMessage">;

export type ContactFormErrorObject = {
    errors: ContactFormFieldError[];
};

export type ContactFormSuccessObject = { message: string; };

export const contactFormFieldsDefinition: Record<string, ContactFormFieldDefinition> = {
    name: {
        name: 'name',
        errorMessage: 'Please enter your name, between 2 and 50 characters',
        minLength: 2,
        maxLength: 50,
        regex: null,
        optional: false
    },
    email: {
        name: 'email',
        errorMessage: 'Invalid email format. Use format: example@domain.com',
        minLength: 5,
        maxLength: 50,
        regex: null,
        optional: false
    },
    phone: {
        name: 'phone',
        errorMessage: 'Invalid phone format. Use format: 1231231234',
        minLength: 10,
        maxLength: 10,
        regex: /^\d{10}$/,
        optional: true,
    },
    subject: {
        name: 'subject',
        errorMessage: 'Please enter a subject, between 5 and 50 characters.',
        minLength: 5,
        maxLength: 50,
        regex: null,
        optional: false
    },
    message: {
        name: 'message',
        errorMessage: 'Please enter a message, between 10 and 500 characters.',
        minLength: 10,
        maxLength: 500,
        regex: null,
        optional: false
    },
    company: {
        name: 'company',
        errorMessage: '',
        minLength: 0,
        maxLength: 0,
        regex: null,
        optional: true
    },
};