import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createBranch = async (req: Request, res: Response): Promise<Response> => {
  const { name, organisationName, founderName, mobileNumber, city, state, pincode, mainBranch } = req.body;
  try {
    // Check if the branch already exists by its name
    const existingBranch = await prisma.branch.findFirst({
      where: {
        name,
        organisationName,
      },
    });

    if (existingBranch) {
      return res.status(400).send('Branch already exists.');
    }
    // Create a new branch
    const newBranch = await prisma.branch.create({
      data: {
        name,
        organisationName,
        founderName,
        mobileNumber,
        city,
        state,
        pincode,
        mainBranch: mainBranch || false, // Default to false if not provided
      },
    });
    return res.status(201).json(newBranch);
  } catch (error) {
    console.error('Error creating branch:', error);
    return res.status(500).send('Internal error: ' + (error as Error).message);
  }
};
export const updateBranch = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { organisationName, founderName, city, state, pincode } = req.body;

  try {
    const existingBranch = await prisma.branch.findFirst({
      where: {
        id: parseInt(id, 10),
      },
    });

    if (!existingBranch) {
      return res.status(400).send('Branch does not exist.');
    }

    const updatedBranch = await prisma.branch.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        organisationName,
        founderName,
        city,
        state,
        pincode,
      },
    });

    return res.status(200).json(updatedBranch);
  } catch (error) {
    return res.status(500).send('Internal error: ' + (error as Error).message);
  }
};

export const deleteBranch = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const existingBranch = await prisma.branch.findFirst({
      where: {
        id: parseInt(id, 10),
      },
    });

    if (!existingBranch) {
      return res.status(400).send('Branch does not exist.');
    }

    await prisma.branch.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    return res.status(200).send('Branch deleted successfully.');
  } catch (error) {
    return res.status(500).send('Internal error: ' + (error as Error).message);
  }
};

export const getBranchByOrganisation = async (req: Request, res: Response): Promise<Response> => {
  const { orgname } = req.params;
  try {
    const isOrg = await prisma.organisation.findUnique({
      where: { organisationName: orgname },
    });

    if (!isOrg) {
      return res.status(400).send('Organisation does not exist.');
    }

    const branches = await prisma.branch.findMany({
      where: { organisationName: orgname },
    });

    if (branches.length === 0) {
      return res.status(400).send('No branches for this organisation.');
    }

    return res.status(200).json(branches);
  } catch (error) {
    return res.status(500).send('Internal error: ' + (error as Error).message);
  }
};
