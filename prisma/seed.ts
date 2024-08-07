import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker'; // Import from '@faker-js/faker'

const prisma = new PrismaClient();

async function main() {
  // Define the features
  const features = [
    'Timetable', 'Academic Calendar', 'Access Student Attendance History',
    'Announcements', 'Assignments', 'Attendance', 'Capture Attendance',
    'Create Announcements', 'Create Assignments', 'Create Events',
    'Create Online Exams', 'Edit Academic Calendar', 'Edit Announcements',
    'Edit Attendance Records', 'Edit Exam Schedule', 'Edit Student Academic Profile',
    'Edit Teacher Salaries', 'Edit Timetable', 'Enter Marks', 'Events Calendar',
    'Exam Schedule', 'Financial Reports', 'Generate Financial Reports',
    'Generate School Analytics Reports', 'Library', 'Manage Library Inventory',
    'Manage Teacher Assignments', 'Manage User Roles', 'Online Exams',
    'Payments', 'Process Payments', 'School Analytics', 'Student Profiles',
    'Teacher Profiles', 'Teacher Salaries', 'View Marks'
  ];

  const accessManagementGroups = ['Admin', 'Student', 'Teachers', 'Management Staff', 'Management'];

  // Create groups
  const createdGroups = await Promise.all(
    accessManagementGroups.map(async (name) => {
      return prisma.accessManagementGroup.create({
        data: { groupName: name,
          groupType:'Default Groups'
         }
      });
    })
  );

  // Create features
  const createdFeatures = await Promise.all(
    features.map(async (name) => {
      return prisma.feature.create({
        data: { name }
      });
    })
  );

  // Define roles
  const roles = ['Admin', 'Teacher', 'Student'];

  // Create 10 random users
  const createdUsers = await Promise.all(
    Array.from({ length: 10 }, async () => {
      const roleIndex = Math.floor(Math.random() * roles.length);
      const groupIndex = Math.floor(Math.random() * createdGroups.length);

      return prisma.user.create({
        data: {
          name: faker.name.fullName(), // Correct method for full name
          email: faker.internet.email(),
          phoneNumber: faker.phone.number(), // Correct method for phone number
          password: faker.internet.password(),
          role: roles[roleIndex],
          accessGroupId: createdGroups[groupIndex].id,
          organisationName: 'QubicGen',
          branchName: 'Main Branch',
        }
      });
    })
  );

  // Define default permissions
  const defaultPermissions = {
    viewAccess: true,
    createAccess: true,
    editAccess: true,
    deleteAccess: false,
  };

  // Create roles and assign permissions
  for (const roleName of roles) {
    const role = await prisma.role.create({
      data: { name: roleName }
    });

    for (const feature of createdFeatures) {
      await prisma.roleFeature.create({
        data: {
          roleId: role.id,
          featureId: feature.id,
          ...defaultPermissions
        }
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
