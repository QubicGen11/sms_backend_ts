import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import logger from '../helpers/logger';

const prisma = new PrismaClient();
class userOperations{
    static getAllUsers=async(req:Request,res:Response)=>{
        try {
            const allUsers=await prisma.user.findMany({})

            if(allUsers.length<=0){
                return res.status(400).send('no users found')
            }
            return res.status(200).send(allUsers)
        } catch (error:any) {
            return res.status(500).send('internal error'+error.message)
        }
    }
}
export default userOperations