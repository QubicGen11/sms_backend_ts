import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
export const createnewAccessGroup=async(req:Request,res:Response)=>{
    const {groupName}=req.body
    try {
        const isExistingGroup=await prisma.accessManagementGroups.findFirst({
            where:{
                groupName:groupName
            }
        })
        if(isExistingGroup){
            return res.status(400).send('group already exists please choose a different name')
        }
        const newGroup=await prisma.accessManagementGroups.create({
            data:{
                groupName:groupName
            }
        })
        return res.status(200).send(newGroup)
    } catch (error:any) {
        return res.status(400).send('internal error'+error.message)

    }
}
