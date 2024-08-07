import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { Response, Request } from "express";
import logger from '../helpers/logger';
import { sendEmail } from '../helpers/sendEmail';
import { group } from "console";
const prisma = new PrismaClient();
class groupActions{
    static createNewGroup=async(req:Request,res:Response)=>{
        const {groupName}=req.body
        try {
            const isexistingGroup=await prisma.accessManagementGroup.findFirst({
                where:{
                    groupName:groupName
                }
            })
            if(isexistingGroup){
                return res.status(400).json({message:'Group already exists please change use other name'})
            }

            const newGroup=await prisma.accessManagementGroup.create({
                data:{
                    groupName:groupName,
                    groupType:"Custom Group"
                }
            })
            return res.status(200).send(newGroup)
        } catch (error:any) {
            return res.status(500).send('internal server error'+error.message)
        }
    }
    static getAllGroups=async(req:Request,res:Response)=>{
        try {
            const getAllGroups=await prisma.accessManagementGroup.findMany({})
            if(getAllGroups.length<=0){
                return res.status(400).json('no groups found')
            }
            return res.status(200).send(getAllGroups)
        } catch (error:any) {
            return res.status(500).send('internal error'+error.message)
        }
    }

    static assignRoleToGroup = async (req: Request, res: Response) => {
        const { roleName, roleId, groupId } = req.body;
        
        try {
            // Find the role by roleId
            const existingRole = await prisma.role.findUnique({
                where: { id: roleId }
            });

            if (!existingRole) {
                return res.status(404).json({ message: 'Role not found' });
            }

            // Find the group by groupId
            const existingGroup = await prisma.accessManagementGroup.findUnique({
                where: { id: groupId }
            });

            if (!existingGroup) {
                return res.status(404).json({ message: 'Group not found' });
            }

            // Update the group with the roleId and roleName
            const updatedGroup = await prisma.accessManagementGroup.update({
                where: { id: groupId },
                data: { 
                    roleId: existingRole.id,
                    roleName:existingRole.name
                }
            });
            return res.status(200).json({ message: 'Role assigned to group successfully', group: updatedGroup });
        } catch (error: any) {
            logger.error('Error assigning role to group', error);
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static assignUsersToGroup = async (req: Request, res: Response) => {
        const { userIds, groupName } = req.body;

        try {
            if (!userIds || !groupName) {
                return res.status(400).json({ message: 'userIds and groupName are required' });
            }

            // Ensure userIds is an array of numbers
            const userIdsArray = userIds.map((id: string) => parseInt(id, 10));

            // Check if any userIds are invalid
            if (userIdsArray.some(isNaN)) {
                return res.status(400).json({ message: 'Invalid userIds provided' });
            }

            // Find the group or create it if it doesn't exist
            let group = await prisma.accessManagementGroup.findFirst({
                where: { groupName: groupName }
            });

            if (!group) {
                group = await prisma.accessManagementGroup.create({
                    data: { groupName: groupName,
                        groupType:'Custom Group'
                     }
                });
            }

            const groupId = group.id;

            // Track users that do not exist
            const nonExistingUserIds: number[] = [];

            // Update each user with the groupId
            const updatedUsers = await Promise.all(userIdsArray.map(async (userId: number) => {
                const user = await prisma.user.findFirst({
                    where: { id: userId }
                });

                if (!user) {
                    nonExistingUserIds.push(userId);
                    return null;
                }

                return prisma.user.update({
                    where: { id: userId },
                    data: { accessGroupId: groupId,
                        accessGroupName:groupName
                     }
                });
            }));

            if (nonExistingUserIds.length > 0) {
                return res.status(400).json({
                    message: 'Some users do not exist',
                    nonExistingUserIds
                });
            }

            return res.status(200).json({
                message: 'Users assigned to group successfully',
                updatedUsers: updatedUsers.filter(Boolean) // Remove null values
            });

        } catch (error: any) {
            logger.error('Error assigning users to group', error);
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    };
     
    static deleteCustomGroup = async (req: Request, res: Response) => {
        const { groupId } = req.params;
        try {
          const groupIdNumber = parseInt(groupId, 10);
    
          const isExistingGroup = await prisma.accessManagementGroup.findFirst({
            where: {
              id: groupIdNumber,
              groupType: 'Custom Group',
            },
          });
    
          if (!isExistingGroup) {
            return res.status(400).send('Group does not exist or is not a Custom Group');
          }
    
          await prisma.accessManagementGroup.delete({
            where: {
              id: groupIdNumber,
            },
          });
    
          return res.status(200).json({ message: 'Group deletion successful' });
        } catch (error: any) {
          return res.status(500).send('Internal server error: ' + error.message);
        }
      };
}
export default groupActions