import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

// Define your default features
const features = [
  { featureName: 'Timetable', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Attendance', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'View Marks', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Assignments', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Announcements', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Student Profiles', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Teacher Profiles', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Library', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Online Exams', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Exam Schedule', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Academic Calendar', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Payments', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Teacher Salaries', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Financial Reports', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'School Analytics', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Events Calendar', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Enter Marks', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Capture Attendance', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Edit Student Academic Profile', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Create Announcements', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Edit Timetable', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Create Assignments', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Edit Attendance Records', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Create Online Exams', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Edit Exam Schedule', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Edit Academic Calendar', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Manage Library Inventory', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Process Payments', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Generate Financial Reports', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Edit Teacher Salaries', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Generate School Analytics Reports', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Create Events', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Edit Announcements', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Manage User Roles', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Access Student Attendance History', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
  { featureName: 'Manage Teacher Assignments', viewAccess: true, createAccess: false, editAccess: false, deleteAccess: false },
];

// Initialize Prisma Client
const prisma = new PrismaClient();

export const insertDefaultFeatures = async () => {
  try {
    // Check if features already exist
    const existingFeatures = await prisma.features.findMany();
    if (existingFeatures.length === 0) {
      // Insert default features
      await prisma.features.createMany({
        data: features,
      });
      console.log('Default features inserted successfully.');
    } else {
      console.log('Default features already exist.');
    }
  } catch (error) {
    console.error('Error inserting default features:', error);
  } finally {
    await prisma.$disconnect();
  }
};

// Export the function
export const getAllFeatures =async(req:Request,res:Response)=>{
  try {
    const allFeatures=await prisma.features.findMany({})
    if(allFeatures.length<=0){
      return res.status(400).send('feature data not available')
    }
    return res.status(200).send(allFeatures)
    
  } catch (error:any) {
    return res.status(500).send('internal error'+error.message)
  }
}