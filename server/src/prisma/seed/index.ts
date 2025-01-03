import { PrismaClient } from '@prisma/client';
import { main as seedWorkoutSetInstances } from './workout_set_instances_seed';
import { main as seedListWorkouts } from './list_workouts_seed';

async function main() {
  await seedListWorkouts();
  await seedWorkoutSetInstances();
  console.log("All seeds executed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    const prisma = new PrismaClient();
    await prisma.$disconnect();
  });
