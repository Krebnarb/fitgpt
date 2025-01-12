import { PrismaClient, Status, TimeUnit } from '@prisma/client';
const prisma = new PrismaClient();

const seedData = {
  WorkoutPlan: {
    name: "Full Body Workout Plan",
    startDate: new Date('2025-01-20T08:00:00Z'),
    description: "A comprehensive workout plan targeting all major muscle groups.",
    schedule: [
      {
        daysOfWeek: [1],
        workoutSetInstances: [
          {
            scheduledDate: new Date('2025-01-01T08:00:00Z'),
            description: "Chest, Triceps, and Cardio",
            status: "COMPLETED" as Status,
            notes: "Felt strong today",
            workoutSetItemInstances: {
              create: [
                {
                  status: "NOT_STARTED" as Status,
                  order: 1,
                  workoutListItem: { connect: { id: 1 } },
                  reps: {
                    create: [
                      { repNumber: 1, count: 15, weight: null, notes: "Warm-up set" },
                      { repNumber: 2, count: 12, weight: null, notes: "Felt strong" },
                    ],
                  },
                },
                {
                  status: "NOT_STARTED" as Status,
                  order: 2,
                  workoutListItem: { connect: { id: 2 } },
                  reps: {
                    create: [
                      { repNumber: 1, count: 10, weight: 50, notes: "Moderate weight" },
                      { repNumber: 2, count: 8, weight: 60, notes: "Increased difficulty" },
                    ],
                  },
                },
                {
                  status: "NOT_STARTED" as Status,
                  order: 3,
                  workoutListItem: { connect: { id: 3 } },
                  reps: {
                    create: [
                      { repNumber: 1, count: 10, weight: 15, notes: "Moderate weight" },
                      { repNumber: 2, count: 8, weight: 15, notes: "Increased difficulty" },
                    ],
                  },
                },
                {
                  status: "NOT_STARTED" as Status,
                  order: 3,
                  workoutListItem: { connect: { id: 4 } },
                  reps: {
                    create: [
                      { repNumber: 1, count: 10, weight: 15, notes: "Moderate weight" },
                      { repNumber: 2, count: 8, weight: 15, notes: "Increased difficulty" },
                    ],
                  },
                },
              ],
            },
          },
        ],
        workoutSet: {
          name: "Chest, Triceps, and Cardio",
          description: "Focuses on Chest, Triceps, and Cardio",
          items: [
            {
              order: 1,
              listWorkoutId: 1
            },
            {
              order: 2,
              listWorkoutId: 2
            },
            {
              order: 3,
              listWorkoutId: 3
            }
          ],
        },
      },
      {
        daysOfWeek: [3],
        workoutSetInstances: [
          {
            scheduledDate: new Date('2025-01-01T08:00:00Z'),
            description: "Back, Biceps, and Abs",
            status: "COMPLETED" as Status,
            notes: "got a little tired towards the end",
            workoutSetItemInstances: {
              create: [
                {
                  status: "NOT_STARTED" as Status,
                  order: 1,
                  workoutListItem: { connect: { id: 7 } },
                  reps: {
                    create: [
                      { repNumber: 1, count: 15, weight: null, notes: "Warm-up set" },
                      { repNumber: 2, count: 12, weight: null, notes: "Felt strong" },
                    ],
                  },
                },
                {
                  status: "NOT_STARTED" as Status,
                  order: 2,
                  workoutListItem: { connect: { id: 8 } },
                  reps: {
                    create: [
                      { repNumber: 1, count: 10, weight: 50, notes: "Moderate weight" },
                      { repNumber: 2, count: 8, weight: 60, notes: "Increased difficulty" },
                    ],
                  },
                },
                {
                  status: "NOT_STARTED" as Status,
                  order: 3,
                  workoutListItem: { connect: { id: 9 } },
                  reps: {
                    create: [
                      { repNumber: 1, count: 10, weight: 15, notes: "Moderate weight" },
                      { repNumber: 2, count: 8, weight: 15, notes: "Increased difficulty" },
                    ],
                  },
                },
                {
                  status: "NOT_STARTED" as Status,
                  order: 3,
                  workoutListItem: { connect: { id: 10 } },
                  reps: {
                    create: [
                      { repNumber: 1, count: 10, weight: 15, notes: "Moderate weight" },
                      { repNumber: 2, count: 8, weight: 15, notes: "Increased difficulty" },
                    ],
                  },
                },
                {
                  status: "NOT_STARTED" as Status,
                  order: 3,
                  workoutListItem: { connect: { id: 19 } },
                  reps: {
                    create: [
                      { repNumber: 1, count: null, weight: null, time: 20, timeUnit: "min" as TimeUnit, notes: "So sweaty" }
                    ],
                  },
                },
              ],
            },
          },
        ],
        workoutSet: {
          name: "Back, Biceps, and Abs",
          description: "Focuses on Back, Biceps, and Abs",
          items: [
            {
              order: 1,
              listWorkoutId: 1
            },
            {
              order: 2,
              listWorkoutId: 2
            },
            {
              order: 3,
              listWorkoutId: 3
            }
          ],
        },
      }
    ]
  }
};

export async function main() {
  const workoutPlan = await prisma.workoutPlan.create({
    data: {
      name: seedData.WorkoutPlan.name,
      description: seedData.WorkoutPlan.description,
      schedule: {
        create: seedData.WorkoutPlan.schedule.map(schedule => ({
          daysOfWeek: schedule.daysOfWeek,
          workoutSetInstances: {
            create: schedule.workoutSetInstances.map(instance => ({
              scheduledDate: instance.scheduledDate,
              description: instance.description,
              status: instance.status,
              workoutSetItemInstances: instance.workoutSetItemInstances
            }))
          },
          workoutSet: {
            create: {
              name: schedule.workoutSet.name,
              description: schedule.workoutSet.description,
              items: {
                create: schedule.workoutSet.items.map(item => ({
                  order: item.order,
                  listWorkoutId: item.listWorkoutId
                }))
              }
            }
          }
        }))
      }
    }
  });

  console.log('Workout Plan Seed data created:', workoutPlan);
}