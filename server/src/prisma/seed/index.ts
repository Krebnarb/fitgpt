import { PrismaClient } from '@prisma/client';
import { main as seedListWorkouts } from './list_workouts_seed';
import { main as seedWorkoutPlans}  from './workout_plan_seed';
import { main as seedUsers } from './users_seed';

async function main() {
  await seedUsers();
  await seedListWorkouts();
  await seedWorkoutPlans();
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
