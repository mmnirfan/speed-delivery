'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, error: 'Missing fields' };
  }

  try {
    await resend.emails.send({
      from: 'Speed Delivery <no-reply@speeddelivery.com>',
      to: 'support@speeddelivery.com',
      subject: `Contact Form Submission from ${name}`,
      replyTo: email,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br />${message}</p>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error('Email sending failed:', err);
    return { success: false, error: 'Failed to send email' };
  }
}
