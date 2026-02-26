import supertest from "supertest";
import { describe, expect, test } from 'vitest';
import { contactFormFieldsDefinition } from "../../src/shared/contact-form-definition";
import app from '../../src/index';

describe("contact form route middleware/route handler", () => {
    test(
        "/api/contact/form-submit /POST - middleware should return a fake 200 OK with custom message for truthy form field value",
        async () => {
            const response =
                await supertest(app)
                    .post("/api/contact/form-submit")
                    .send({
                        "name": "caleb pirkle",
                        "email": "calebpirkle2@gmail.com",
                        "subject": "this is a test for honeypot",
                        "message": "a body message for the test",
                        "phone": "8172626262",
                        "company": "only a bot should fill this out"
                    })
                    .set("content-type", "application/json");

            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual({ message: 'Yeah man, the email was totally sent dude!' });
            expect(response.body.message).toBe('Yeah man, the email was totally sent dude!');
        }
    );
    test(
        "/api/contact/form-submit /POST - should return 400",
        async () => {
            const subjectDefinition = contactFormFieldsDefinition.subject;
            const response =
                await supertest(app)
                    .post("/api/contact/form-submit")
                    .send({
                        "name": "caleb pirkle",
                        "email": "calebpirkle2@gmail.com",
                        "subject": "", // required field, should return error 400 to client
                        "message": "long enough for a succesful submission",
                        "phone": "8172626262",
                        "company": ""
                    })
                    .set("content-type", "application/json");

            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.status).toEqual(400);
            expect(response.body).toEqual({ errors: [{ name: subjectDefinition.name, errorMessage: subjectDefinition.errorMessage }] });
        }
    );

    // the following test works, but actually sends email with ses lol
    // test(
    //     "/api/contact/form-submit /POST - should return 200 okay",
    //     async () => {
    //         const response =
    //             await supertest(app)
    //                 .post("/api/contact/form-submit")
    //                 .send({
    //                     "name": "caleb pirkle",
    //                     "email": "calebpirkle2@gmail.com",
    //                     "subject": "this is a test for human input",
    //                     "message": "a body message for the test",
    //                     "phone": "8172626262",
    //                     "company": ""
    //                 })
    //                 .set("content-type", "application/json");

    //         expect(response.headers["content-type"]).toMatch(/json/);
    //         expect(response.status).toEqual(200);
    //         expect(response.body).toEqual({ message: 'email sent, thank you!' });
    //         expect(response.body.message).toBe('email sent, thank you!');
    //     }
    // );
})

