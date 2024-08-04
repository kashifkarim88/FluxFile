import { NextResponse } from 'next/server';
import { EmailTemplate } from '../../_components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const response = await req.json();
    console.log('Received response:', response);

    const emailContent = {
      from: 'FluxFiles@resend.dev',
      to: response?.emailToSend,
      subject: `${response?.userName} shared a file with you`,
      react: EmailTemplate({ response }),
    };
    console.log('Email content:', emailContent);

    const { data, error } = await resend.emails.send(emailContent);

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Catch block error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
