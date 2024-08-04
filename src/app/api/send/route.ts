import { EmailTemplate } from '../../_components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    const response = await req.json(); // Corrected typo: 'responce' to 'response'
    console.log('Received response:', response); // Logging the response to debug
    try {
        const emailContent = {
            from: 'FluxFiles@resend.dev',
            to: response?.emailToSend, //'kyvic0045@gmail.com'
            subject: response?.userName + ' share file with you', // Corrected typo
            react: EmailTemplate({ response }), // Corrected typo
        };
        console.log('Email content:', emailContent); // Logging email content to debug

        const { data, error } = await resend.emails.send(emailContent);

        if (error) {
            console.error('Error sending email:', error); // Logging error to debug
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        console.error('Catch block error:', error); // Logging error to debug
        return Response.json({ error }, { status: 500 });
    }
}
