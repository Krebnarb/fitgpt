import { PrismaClient, TargetArea, Status } from '@prisma/client';

const prisma = new PrismaClient();

export async function main() {
  const workoutSetInstances = [
    {
      scheduledDate: new Date('2025-01-01T08:00:00Z'),
      description: "Arms, Shoulders, and Legs",
      status: "SCHEDULED" as Status,
      itemInstances: {
        create: [
          {
            status: "NOT_STARTED" as Status,
            workoutListItem: { connect: { id: 1 } }, // Assuming the workoutListItem with id 1 exists
            reps: {
              create: [
                { repNumber: 1, count: 15, weight: null, notes: "Warm-up set" },
                { repNumber: 2, count: 12, weight: null, notes: "Felt strong" },
              ],
            },
          },
          {
            status: "NOT_STARTED" as Status,
            workoutListItem: { connect: { id: 2 } },
            reps: {
              create: [
                { repNumber: 1, count: 10, weight: 50, notes: "Moderate weight" },
                { repNumber: 2, count: 8, weight: 60, notes: "Increased difficulty" },
              ],
            },
          },
        ],
      },
    }
  ];
  
  for (const workoutSetInstance of workoutSetInstances) {
    await prisma.workoutSetInstance.create({
      data: workoutSetInstance,
    });
  }
  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
