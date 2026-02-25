import './shared/navigation';
import './shared/scroll-to-top';
import { initNavbarTransparency } from './shared/navbar-transparency';
import {
    contactFormFieldsDefinition,
    type ContactFormErrorObject, type ContactFormSuccessObject, type ContactFormFieldError,
} from '../src/shared/contact-form-definition';

initNavbarTransparency();

const OPTIONAL_FIELDS = new Set(
    Object.values(contactFormFieldsDefinition)
        .filter(def => def.optional)
        .map(def => def.name)
);

const form = document.querySelector<HTMLFormElement>('.contact-form');
const successEl = document.querySelector<HTMLElement>('.contact-form__success');

if (form && successEl) {
    const formFields = Array.from(
        form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[name]')
    ).filter(field => field.name in contactFormFieldsDefinition);

    formFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.closest('.contact-form__group')?.classList.contains('has-error')) {
                validateField(field);
            }
        });
    });

    form.addEventListener('submit', async (e: SubmitEvent) => {
        e.preventDefault();

        const allValid = formFields.every(field => validateField(field));
        if (!allValid) return;

        try {
            const formValues = Object.fromEntries(
                formFields.map(field => [field.name, field.value.trim()])
            );
            const data = await submitForm("/api/contact/form-submit", {
                headers: { "content-type": "application/json" },
                method: "POST",
                body: JSON.stringify(formValues),
            });

            if ('errors' in data) {
                showServerErrors(data.errors, form);
            } else {
                form.classList.add('hidden');
                successEl.classList.add('visible');
            }
        }
        catch (error) {
            error instanceof Error ? console.error(error.message) : console.error(error);
        }
    });
}

function showServerErrors(errors: ContactFormFieldError[], form: HTMLFormElement): void {
    const errorNames = new Set(errors.map(e => e.name));
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[name]').forEach(field => {
        validateField(field, errorNames.has(field.name));
    });
}

function validateField(field: HTMLInputElement | HTMLTextAreaElement, hasServerError = false): boolean {
    const group = field.closest<HTMLElement>('.contact-form__group');
    if (!group) return true;

    if (hasServerError) {
        field.classList.add('has-error');
        group.classList.add('has-error');
        return false;
    }

    const fieldDefinition = contactFormFieldsDefinition[field.name];
    if (!fieldDefinition) return true;

    const value = field.value.trim();

    // Optional fields are valid when empty
    if (OPTIONAL_FIELDS.has(field.name) && value === '') {
        field.setCustomValidity('');
        field.classList.remove('has-error');
        group.classList.remove('has-error');
        return true;
    }

    // Clear stale custom error so validity flags reflect only HTML constraints
    field.setCustomValidity('');

    const validity = field.validity;
    const validityCheck = validity.valueMissing || validity.typeMismatch;
    const minMaxCheck = value.length < fieldDefinition.minLength || value.length > fieldDefinition.maxLength;
    const regexCheck = !!fieldDefinition.regex && !fieldDefinition.regex.test(value);

    if (minMaxCheck || validityCheck || regexCheck) {
        field.setCustomValidity(fieldDefinition.errorMessage);
        field.classList.add('has-error');
        group.classList.add('has-error');
        return false;
    }

    field.classList.remove('has-error');
    group.classList.remove('has-error');
    return true;
}

async function submitForm(
    url: string,
    data: RequestInit
): Promise<ContactFormSuccessObject | ContactFormErrorObject> {
    const response = await fetch(url, data);

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
        throw new Error(`Expected JSON, received ${contentType}`);
    }

    return await response.json();
}
