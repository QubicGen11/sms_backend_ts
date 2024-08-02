import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new role and update features with role-specific access
export const createNewRole = async (req: Request, res: Response) => {
  const { roleName, features } = req.body;

  try {
    // Check if the role already exists
    const existingRole = await prisma.role.findFirst({
      where: { roleName }
    });

    if (existingRole) {
      return res.status(400).json({ message: 'Role already exists' });
    }

    // Create a new role
    const newRole = await prisma.role.create({
      data: { roleName }
    });

    // Create role features
    await prisma.roleFeature.createMany({
      data: features.map((feature: any) => ({
        roleId: newRole.id,
        roleName:roleName,
        featureId: feature.featureId,
        createAccess: feature.createAccess,
        editAccess: feature.editAccess,
        viewAccess: feature.viewAccess,
        deleteAccess: feature.deleteAccess
      }))
    });

    // Fetch the created role along with its features
    const createdRole = await prisma.role.findUnique({
      where: { id: newRole.id },
      include: { roleFeatures: true }
    });

    res.status(201).json(createdRole);
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ message: 'Error creating role', error });
  }
};

// Update an existing role and features with role-specific access
export const updateRole = async (req: Request, res: Response) => {
  const { roleId, roleName, features } = req.body;

  try {
    // Check if the role exists
    const existingRole = await prisma.role.findUnique({
      where: { id: roleId }
    });

    if (!existingRole) {
      return res.status(404).json({ message: 'Role not found' });
    }

    // Update the role name
    const updatedRole = await prisma.role.update({
      where: { id: roleId },
      data: { roleName }
    });

    // Delete old role features
    await prisma.roleFeature.deleteMany({
      where: { roleId }
    });

    // Create new role features
    await prisma.roleFeature.createMany({
      data: features.map((feature: any) => ({
        roleId: roleId,
        roleName:roleName,
        featureId: feature.featureId,
        createAccess: feature.createAccess,
        editAccess: feature.editAccess,
        viewAccess: feature.viewAccess,
        deleteAccess: feature.deleteAccess
      }))
    });

    // Fetch the updated role along with its features
    const fetchedUpdatedRole = await prisma.role.findUnique({
      where: { id: roleId },
      include: { roleFeatures: true }
    });

    res.status(200).json(fetchedUpdatedRole);
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ message: 'Error updating role', error });
  }
};

// Delete a role and disassociate its features
export const deleteRole = async (req: Request, res: Response) => {
  const { roleId } = req.params;

  try {
    // Check if the role exists
    const existingRole = await prisma.role.findUnique({
      where: { id: roleId }
    });

    if (!existingRole) {
      return res.status(404).json({ message: 'Role not found' });
    }

    // Delete role features
    await prisma.roleFeature.deleteMany({
      where: { roleId }
    });

    // Delete the role
    await prisma.role.delete({
      where: { id: roleId }
    });

    res.status(200).json({ message: 'Role and associated features deleted successfully' });
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).json({ message: 'Error deleting role', error });
  }
};

// Fetch roles with associated features and access permissions
export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await prisma.role.findMany({
      include: { roleFeatures: true }
    });

    res.status(200).json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ message: 'Error fetching roles', error });
  }
};
