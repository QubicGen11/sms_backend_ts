import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import logger from '../helpers/logger';
import bcrypt from 'bcrypt';
import { sendEmail } from '../helpers/sendEmail';

const prisma = new PrismaClient();

class userOperations {
    static getAllUsers = async (req: Request, res: Response) => {
        try {
            const allUsers = await prisma.user.findMany({})

            if (allUsers.length <= 0) {
                return res.status(400).send('No users found')
            }
            return res.status(200).send(allUsers)
        } catch (error: any) {
            logger.error('Error fetching users:', error);
            return res.status(500).send('Internal error: ' + error.message)
        }
    }

    static adminUserInvite = async (req: Request, res: Response) => {
        const { firstName, lastName, email, phoneNumber, password, groupId, groupName } = req.body;

        try {
            // Check if the user already exists
            const isUser = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (isUser) {
                return res.status(400).send('User already exists');
            }

            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user in the database
            const newUser = await prisma.user.create({
                data: {
                    name: `${firstName} ${lastName}`,
                    email,
                    phoneNumber,
                    password: hashedPassword,
                    // Assuming 'group' is a valid relation in your Prisma schema
                    accessGroup: {
                        connectOrCreate: {
                            where: { id: groupId },
                            create: { groupName: groupName },
                        },
                    },
                },
            });

            // Send an email to the new user
            const emailOptions = {
                to: newUser.email as string, // Ensure email is string
                subject: 'Welcome to Our Platform',
                text: `Hello ${firstName},\n\nWelcome to our platform! Your account has been created successfully.\n\nBest Regards,\nTeam`,
                html: `<p>Hello ${firstName},</p><p>Welcome to our platform! Your account has been created successfully.</p><p>Best Regards,<br>Team</p>`,
            };

            await sendEmail(emailOptions);

            res.status(201).json({ message: 'User created and invitation email sent', user: newUser });
        } catch (error: any) {
            logger.error('Error inviting user:', error);
            res.status(500).send('Internal Server Error');
        }
    };
}

export default userOperations;
