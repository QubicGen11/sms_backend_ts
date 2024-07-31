import { sendEmail } from '../helpers/sendEmail';

export const sendPasswordChangeEmail = async (email: string, resetCode: string) => {
  const subject = 'Your Password Reset Code';
  const text = `Your password reset code is: ${resetCode}`;
  const html = `<p>Your password reset code is: <strong>${resetCode}</strong></p>`;

  try {
    await sendEmail({ to: email, subject, text, html });
    console.log('Password change email sent successfully');
  } catch (error) {
    console.error('Error sending password change email:', error);
  }
};
