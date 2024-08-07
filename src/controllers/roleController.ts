import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import logger from '../helpers/logger';

const prisma = new PrismaClient();

interface CreateRoleRequest {
  roleName: string;
  features: {
    id: number; // Feature ID
    createAccess?: boolean;
    editAccess?: boolean;
    viewAccess?: boolean;
    deleteAccess?: boolean;
  }[];
}

class roleOperations {
  static createRole = async (req: Request, res: Response) => {
    const { roleName, features }: CreateRoleRequest = req.body;
    try {
      // Create a new role
      const newRole = await prisma.role.create({
        data: {
          name: roleName
        }
      });
      // Assign permissions to features
      const roleFeaturePromises = features.map(feature => 
        prisma.roleFeature.create({
          data: {
            roleId: newRole.id,
            featureId: feature.id,
            createAccess: feature.createAccess ?? false,
            editAccess: feature.editAccess ?? false,
            viewAccess: feature.viewAccess ?? true,
            deleteAccess: feature.deleteAccess ?? false
          }
        })
      );

      await Promise.all(roleFeaturePromises);

      return res.status(201).json({ message: 'Role created successfully', role: newRole });
    } catch (error: any) {
      logger.error('Error creating role and assigning permissions', error);
      return res.status(500).send('Internal server error: ' + error.message);
    }
  }
  static assignRoleToUser = async (req: Request, res: Response) => {
    const { roleId, userId } = req.body;
    try {
        // Ensure roleId and userId are provided and are strings
        if (!roleId || !userId) {
            return res.status(400).json({ message: 'roleId and userId are required' });
        }

        const isExistingRole = await prisma.role.findFirst({
            where: {
                id: roleId
            }
        });

        if (!isExistingRole) {
            return res.status(400).json({ message: 'Role does not exist' });
        }

        const isExistingUser = await prisma.user.findFirst({
            where: {
                id: userId
            }
        });

        if (!isExistingUser) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const addRoleToUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role: isExistingRole.name
            }
        });

        return res.status(200).json(addRoleToUser);
    } catch (error: any) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
static getAllRoles=async(req:Request,res:Response)=>{
  try {
    const getAllRoles=await prisma.role.findMany({
    })
    if(getAllRoles.length<=0){
      return res.status(400).send('role data not available')
    }
    return res.status(200).send(getAllRoles)
  } catch (error:any) {
    return res.status(500).send('internal error'+error.message)
  }
}
}

export default roleOperations;
