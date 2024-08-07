import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { Response, Request } from "express";
import logger from '../helpers/logger';
import { sendEmail } from '../helpers/sendEmail';

// Define the interface for the organisation creation request
interface OrganisationCreationRequest extends Request {
  body: {
    organisationName: string;
    registerPersonName: string;
    founderFirstName: string;
    founderLastName: string;
    mobileNumber: string;
    typeOfSchool: string;
    syllabusType: string;
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
// Define the organisationOperations class with static methods
class OrganisationOperations {
  static createOrganisation = async (req: OrganisationCreationRequest, res: Response): Promise<void> => {
    const {
      organisationName,
      registerPersonName,
      founderFirstName,
      founderLastName,
      mobileNumber,
      typeOfSchool,
      syllabusType,
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
    const hashedPassword = await bcrypt.hash(founderPassword, 10);
    try {
      // Start a transaction
      const result = await prisma.$transaction(async (prisma) => {
        // Create new organisation
        const newOrganisation = await prisma.organisation.create({
          data: {
            name: organisationName,
            registerPersonName,
            founderFirstName,
            founderLastName,
            mobileNumber,
            typeOfSchool,
            syllabusType,
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
        // Create main branch
        const newBranch = await prisma.branch.create({
          data: {
            name: 'Main Branch',
            organisationId: newOrganisation.id, // Use the integer ID from the organisation
            organisationName: organisationName,
            mobileNumber,
            founderName: `${founderFirstName} ${founderLastName}`,
            mainBranch: true,
            city,
            state,
            pincode
          }
        });
        // Create founder user
        const newUser = await prisma.user.create({
          data: {
            name: `${founderFirstName} ${founderLastName}`,
            email: founderEmail,
            phoneNumber: mobileNumber,
            password: hashedPassword,
            role: 'Founder',
            branchId: newBranch.id,
            organisationName: organisationName,
            branchName: newBranch.name
          }
        });
        return { newOrganisation, newBranch, newUser };
      });

      // Send success response
      res.status(201).json({
        message: "Organisation, branch, and founder user created successfully!",
        organisation: result.newOrganisation,
        branch: result.newBranch,
        user: result.newUser
      });

      // Send email notification (if needed)
      await sendEmail({
        to: founderEmail,
        subject: 'Organisation Created',
        text: `Your organisation ${organisationName} has been created successfully.`
      });
    } catch (error) {
      logger.error('Error creating organisation:', error);
      res.status(500).json({ error: 'An error occurred while creating the organisation' });
    }
  };
}

export default OrganisationOperations;
