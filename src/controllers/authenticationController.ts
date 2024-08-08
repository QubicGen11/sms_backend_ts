import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Response, Request } from "express";
import decodeJwt from "../config/jwtDecode";
const prisma = new PrismaClient();
const JWT_SECRET =  process.env.JWT_SECRET || 'default key'

class Authentication {
    static async userLogin(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });

            if (!user) {
                return res.status(400).json({ message: 'User not found, please check the email' });
            }

            if (!user.password) {
                return res.status(400).json({ message: 'Password is not set for the user' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            const token = jwt.sign({ id: user.id, email: user.email,role:user.role }, JWT_SECRET, { expiresIn: '1h' });

            console.log('User role:', user.role); // Debugging line
            console.log('User Id:', user.id); // Debugging line
            const decodedToken=decodeJwt(token)
            return res.status(200).json({
                message: 'Login successful',
                token,
                decodedToken,
            });
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ message: 'An error occurred during login' });
        }
    }
}

export default Authentication