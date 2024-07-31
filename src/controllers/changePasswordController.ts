import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { generatePassword } from '../utils/generatePassword';
import { sendEmail } from '../helpers/sendEmail';
import { sendPasswordChangeEmail } from '../utils/setPasswordChangeEmail';
const prisma = new PrismaClient();

export const sendResetCode = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetCode = generatePassword();
    const hashedResetCode = await bcrypt.hash(resetCode, 10);

    await prisma.user.update({
      where: { email },
      data: { resetCode: hashedResetCode },
    });

   await sendPasswordChangeEmail(email,resetCode)

    res.status(200).json({ message: 'Password reset code sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { email, newPassword, resetCode } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify reset code
    const isResetCodeValid = await bcrypt.compare(resetCode, user.resetCode ||'');
    if (!isResetCodeValid) {
      return res.status(400).json({ error: 'Invalid reset code' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email: email },
      data: { password: hashedPassword, resetCode: null }, // clear the reset code after successful password change
    });

    // Send email notification
    await sendEmail({
      to: email,
      subject: 'Your password has been changed',
      text: `Hello ${user.name},\n\nYour password has been successfully changed.\n\nBest Regards,\nYour Team`,
    });

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while updating the password' });
  }
};