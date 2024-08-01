import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Response, Request } from "express";

const prisma = new PrismaClient();
const JWT_SECRET = 'your_secret_key' 

export const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        // Check if user exists
        if (!user || !user.password) {
            return res.status(400).send('Invalid email or password');
        }
        // Compare the provided password with the hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).send('Invalid email or password');
        }

        // Password matches, generate a JWT token
        const token = jwt.sign({ userId: user.id,role:user.role }, JWT_SECRET, { expiresIn: '1h' });

        // Send the token to the client
        return res.status(200).json({ message: 'Login successful', token });
        
    } catch (error: any) {
        console.error(error);
        return res.status(500).send('Internal server error' + error.message);
    }
};
