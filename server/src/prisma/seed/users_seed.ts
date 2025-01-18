import { PrismaClient, TargetArea } from '@prisma/client';

const prisma = new PrismaClient();

export async function main() {
  const users = [
    {
      id: 1,
      sourceName: "telegram",
      sourceId: "abc123",
      firstName: "Ethan",
      lastName: "Liu",
      email: "ett@gmail.com"
    }
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: user, // Update fields if record exists
      create: user, // Create record if it doesn't exist
    });
  }

  console.log("Users Database seeded successfully!");
}