import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { Response, Request } from "express";
import logger from '../helpers/logger';
import { sendEmail } from '../helpers/sendEmail';
const prisma = new PrismaClient();

class branchOperations{
    static createOrganisation=async(req:Request,res:Response)=>{
        const{name,organisationId,organisationName,mobileNumber,founderName,mainBranch,city,state,pincode}=req.body
        try {
            const existingOrganisation=await prisma.organisation.findFirst({
                where:{
                    name:organisationName
                }
            })
            const existingBranch=await prisma.branch.findFirst({
                where:{
                    name:name
                }
            })
            if(  !existingOrganisation){
                return res.status(400).json({message:'organisation or branch details exist, please enter new details'})
            }
            if(  existingBranch){
                return res.status(400).json({message:'organisation or branch details exist, please enter new details'})
            }
            const founderFullName = `${existingOrganisation.founderFirstName ?? ''} ${existingOrganisation.founderLastName ?? ''}`.trim();
            const newBranch=await prisma.branch.create({
                data:{
                    name:name,
                    organisationId:existingOrganisation.id,
                    organisationName:existingOrganisation.name,
                    mobileNumber:mobileNumber,
                    founderName:founderFullName,
                    city:city,
                    state:state,
                    pincode:pincode
                }
            })
            return res.status(200).json({message:'branch created succesfully',branch:newBranch})
        } catch (error:any) {
            return res.status(500).send('internal server error'+error.message)
        }
    }
}

export default branchOperations