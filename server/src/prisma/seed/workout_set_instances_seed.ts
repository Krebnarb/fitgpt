import { PrismaClient, TargetArea, Status } from '@prisma/client';

const prisma = new PrismaClient();

export async function main() {
  const workoutSetInstances = [
    {
      id: 1,
      scheduledDate: new Date('2025-01-01T08:00:00Z'),
      description: "Arms, Shoulders, and Legs",
      status: "COMPLETED" as Status,
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
    },
    {
      id: 2,
      scheduledDate: new Date('2025-01-03T08:00:00Z'),
      description: "Chest, Back, and Core",
      status: "SCHEDULED" as Status,
      itemInstances: {
        create: [
          {
            status: "NOT_STARTED" as Status,
            workoutListItem: { connect: { id: 3 } }, // Assuming the workoutListItem with id 1 exists
            reps: {
              create: [
                { repNumber: 1, count: 15, weight: null, notes: "Warm-up set" },
                { repNumber: 2, count: 12, weight: null, notes: "Felt strong" },
              ],
            },
          },
          {
            status: "NOT_STARTED" as Status,
            workoutListItem: { connect: { id: 4 } },
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
  
  await Promise.all(workoutSetInstances.map(async (workoutSetInstance: typeof workoutSetInstances[0]) => {
    await prisma.workoutSetInstance.upsert({
      where: { id: workoutSetInstance.id },
      update: workoutSetInstance,
      create: workoutSetInstance,
    });
  }))
  console.log("workoutSetInstance Database seeded successfully!");
}