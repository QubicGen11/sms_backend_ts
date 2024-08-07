import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import logger from '../helpers/logger';
const prisma=new PrismaClient()
class featureOperations{
    static getAllFeatures=async(req:Request,res:Response)=>{
        try {
            const getAllFeatures=await prisma.feature.findMany({})
            if(getAllFeatures.length<=0){
                return res.status(400).send('no features available')
            }
            return res.status(200).send(getAllFeatures)
        } catch (error:any) {
            return res.status(200).send('internal error'+error.message)
        }
    }
}
export default featureOperations