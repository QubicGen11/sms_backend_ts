import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { Response, Request } from "express";
import logger from '../helpers/logger';
import {sendEmail} from '../helpers/sendEmail';

interface OrganisationCreationRequest extends Request {
  body: {
    organisationName: string;
    registerPersonName: string;
    founderFirstName: string;
    founderLastName: string;
    mobileNumber: string;
    typeOfSchool: string;
    syllubusType: string;
    addressLine1: string;
    addressLine2: string;
    email: string;
    city: string;
    state: string;
    pincode: string;
    mandal: string;
    founderEmail: string;
    founderPassword: string;
  };
}

const prisma = new PrismaClient();

export const createNewOrganisation = async (req: OrganisationCreationRequest, res: Response) => {
  const {
    organisationName,
    registerPersonName,
    founderFirstName,
    founderLastName,
    mobileNumber,
    typeOfSchool,
    syllubusType,
    addressLine1,
    addressLine2,
    email,
    city,
    state,
    pincode,
    mandal,
    founderEmail,
    founderPassword
  } = req.body;

  try {
    // Check if organisation already exists
    const existingOrganisation = await prisma.organisation.findUnique({
      where: { organisationName }
    });

    if (existingOrganisation) {
      logger.warn(`Organisation with email ${email} already exists.`);
      return res.status(400).json({ message: 'Organisation already exists.' });
    }

    // Hash the founder's password
    const hashedPassword = await bcrypt.hash(founderPassword, 10);

    // Create new organisation, branch, and user in a transaction
    const newOrganisation = await prisma.$transaction(async (prisma) => {
      const createdOrganisation = await prisma.organisation.create({
        data: {
          organisationName,
          registerPersonName,
          founderFirstName,
          founderLastName,
          mobileNumber,
          typeOfSchool,
          syllubusType,
          addressLine1,
          addressLine2,
          email,
          city,
          state,
          pincode,
          mandal,
          founderEmail,
          founderPassword: hashedPassword
        }
      });

      const createdBranch = await prisma.branch.create({
        data: {
          name: `main branch of ${createdOrganisation.organisationName}`,
          organisationId: createdOrganisation.id,
          organisationName: createdOrganisation.organisationName,
          mobileNumber: createdOrganisation.mobileNumber,
          founderName: `${founderFirstName} ${founderLastName}`,
          mainBranch: true,
          city: createdOrganisation.city,
          state: createdOrganisation.state,
          pincode: createdOrganisation.pincode
        }
      });

      const createdUser = await prisma.user.create({
        data: {
          email: founderEmail,
          password: hashedPassword,
          role: "Super Admin",
          organisationName: createdOrganisation.organisationName,
          branchId: createdBranch.id,
          name: `${founderFirstName} ${founderLastName}`
        }
      });

      return createdOrganisation;
    });

    // Send email to the founder
    await sendEmail({
      to: founderEmail,
      subject: 'Helo  !',
      text: `Hello ${founderFirstName} ${founderLastName},\n\nYour organization "${organisationName}" has been successfully created.\n\nBest Regards,\nBright Future Academy Team`
    });

    logger.info(`New organisation created: ${organisationName}`);
    res.status(201).json(newOrganisation);
  } catch (error: any) {
    logger.error(`Error creating organisation: ${error.message}`);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
export const checkExistingOrganisation = async (req: Request, res: Response) => {
  const { organisationName } = req.body;

  try {
    const existingOrganisation = await prisma.organisation.findUnique({
      where: {
        organisationName: organisationName,
      },
    });

    if (existingOrganisation) {
      logger.warn(`Organisation already exists with name ${organisationName}. Please use a different name.`);
      return res.status(400).send(`Organisation already exists with name ${organisationName}. Please use a different name.`);
    }

    // If no existing organization found
    return res.status(200).send(`Organisation name ${organisationName} is available.`);
  } catch (error: any) {
    logger.error(`Internal server error: ${error.message}`);
    return res.status(500).send(`Internal server error: ${error.message}`);
  }
};