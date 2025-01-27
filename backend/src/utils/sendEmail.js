import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {
  try {
    const emailResponse = await resend.emails.send({
      from: process.env.RESEND_MAIL, // Verified email address
      to: to,
      subject: subject,
      text: text,
    });
    console.log('Email sent successfully:', emailResponse);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Email sending failed');
  }
};

export default sendEmail;
