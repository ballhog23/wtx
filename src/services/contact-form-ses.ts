import { SendEmailCommand, MessageRejected } from "@aws-sdk/client-ses";
import { ContactFormSchema } from "@shared/contact-form-schema.js";
import { config } from "../config.js";
import { BadRequestError, ServiceUnavailableError } from "../lib/errors.js";



const createSendEmailCommand = (toAddress: string, fromAddress: string, data: ContactFormSchema) => {
    console.log(data);
    return new SendEmailCommand({
        Destination: {
            BccAddresses: [],
            CcAddresses: [],
            // can attach other emails to send contact form to
            // may be useful to attach all teammates emails for 
            // more eyes on, slightly increases quota
            ToAddresses: [
                toAddress,
            ],
        },
        Message: {
            Subject: {
                Charset: "UTF-8",
                Data: data.subject, // subject string
            },
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `
                        <h1>Always be mindful of what you click within this email!</h1>
                        <h2>Subject:</h2>                        
                        <p>${data.subject}</p>                     
                        <h2>Client Name:</h2>                      
                        <p>${data.name}</p>                       
                        <h2>Client Message:</h2>                       
                        <p>${data.message}</p>
                        <h2>Client Contact Info:</h2>
                        <p>Email: ${data.email}</p>
                        <p>${data.phone ? data.phone : 'Phone number not provided.'}</p>
                        `,
                },
            },
        },
        Source: fromAddress,
        ReplyToAddresses: [],
    });
};

export const sendEmail = async (data: ContactFormSchema) => {
    const sendEmailCommand = createSendEmailCommand(
        config.aws.email,
        config.aws.email,
        data
    );

    try {
        return await config.aws.sesClient.send(sendEmailCommand);
    } catch (caught) {
        if (caught instanceof MessageRejected)
            throw new BadRequestError("Email address rejected.");

        throw new ServiceUnavailableError("Email service unavailable, please try again later.");
    }
};


